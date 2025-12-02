import { Component, OnInit } from '@angular/core';
import { MealType, Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard, ReactiveFormsModule],
  standalone: true,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css'],
})
export class RecipeList implements OnInit {

  recipes : Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  mealTypes = Object.values(MealType); //list from enum

  filterForm!: FormGroup;


  constructor(private recipeService: RecipeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.filteredRecipes = recipes;
    });
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      search: [''],
      ingredients: [''],
      meal: ['']
    });

    // when search changer reapply filter
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((values) => {
        this.applyFilters(values);
      });
  }


  // filter logic
  applyFilters(values: any): void {
    const search = this.normalize(values.search);
    const ingredients = values.ingredients || '';
    const meal = values.meal || '';

    const ing = ingredients
      .split(',')
      .map((i: string) => this.normalize(i))
      .filter((i: string) => i);


    this.filteredRecipes = this.recipes.filter((recipe) => {
      const titleMatch = this.normalize(recipe.title).includes(search) ||
        this.normalize(recipe.description).includes(search);


      const mealMatch = !meal || recipe.meal === meal;


      const recipeIngredients = recipe.ingredients.map(i =>
        this.normalize(i.name)
      );

      const ingredientsMatch = ing.length === 0 || ing.every((i: string) =>
        recipeIngredients.some(r => r.includes(i))
      );

      return titleMatch && mealMatch && ingredientsMatch;
    });
  }

  private normalize(text: string): string {
    return (text || '').toString().trim().toLowerCase();
  }

  clearFilter(): void {
    this.filterForm.reset({
      search: '',
      ingredients: '',
      meal: '',
    });
  }
}

