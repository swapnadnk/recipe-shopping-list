import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Jambalaya', 
    //     'Yummy Jambalaya pasta', 
    //     'https://www.thecheesecakefactory.com/assets/images/Recipes-Images/640x360-Cajun-Jambalaya-Pasta.jpg',
    //     [
    //         new Ingredient('Olive oil', 2),
    //         new Ingredient('Boneless/Skinless Chicken Breasts', 1),
    //         new Ingredient('Cajun Spice Blend', 2),
    //         new Ingredient('Green Peppers', 4),
    //         new Ingredient('Red Onions', 4),
    //         new Ingredient('Shrimp', 20),
    //         new Ingredient('Blanched Garlic', 4),
    //         new Ingredient('Cajun Spice Blend', 2),
    //         new Ingredient('Kosher Salt', 1),
    //         new Ingredient('Ground Black Pepper', 7),
    //         new Ingredient('Roma Tomatoes', 1),
    //         new Ingredient(' Spicy Chicken-Seafood Broth', 2),
    //         new Ingredient('Chopped Parsley', 4),
    //         new Ingredient('Linguini Pasta', 2)
    //     ]),
    //     new Recipe('Big Fat Greek Burger', 
    //     'What else you need to say?', 
    //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/6/5/0/Big-Fat-Greek-Burgers_s4x3.jpg.rend.hgtvcom.826.620.suffix/1394585890642.jpeg',
    //     [
    //         new Ingredient('Nonfat Greek style yogurt', 0.5),
    //         new Ingredient('Olive oil', 2),
    //         new Ingredient('Fresh lemon juice', 2),
    //         new Ingredient('Garlic', 4),
    //         new Ingredient('Fresh dill leaves', 4),
    //         new Ingredient('Salt', 1),
    //         new Ingredient('Black pepper', 4),
    //         new Ingredient('Onion', 1),
    //         new Ingredient('Baby spinach', 10),
    //         new Ingredient('Feta cheese', 1),
    //         new Ingredient('Turkey breast', 1),
    //         new Ingredient('Burger buns', 4),
    //         new Ingredient('Cucumber', 2),
    //         new Ingredient('Romaine lettuce', 4)
    //     ])
    //   ];

    private recipes: Recipe[] = [];

      constructor(private shoppingListService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice()); 
      }

}