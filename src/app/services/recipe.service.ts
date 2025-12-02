import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl ='http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  getRecipeById(id: string): Observable<Recipe> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Recipe>(url);
  }

  addRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, recipe);
  }
}
