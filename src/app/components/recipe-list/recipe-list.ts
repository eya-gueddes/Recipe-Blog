import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule, RecipeCard],
  standalone: true,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css'],
})
export class RecipeList implements OnInit {
  recipes : Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() : void {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }
}

