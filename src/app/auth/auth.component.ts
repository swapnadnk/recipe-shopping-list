import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private subscription: Subscription;

    constructor(private authService: AuthService,
        private router: Router){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signup(email, password);
            
        }

        this.subscription = authObs.subscribe(respData => {
            console.log(respData);
            this.isLoading = false;
            this.router.navigate(['/recipes'])
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
        });
        form.reset();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}