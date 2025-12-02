import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { MealColor } from '../../directives/meal-color';
@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink, SlicePipe, CommonModule, MealColor],
  standalone: true,
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() recipe!: Recipe;
}
