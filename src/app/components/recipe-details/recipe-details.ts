import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit{

  recipe?: Recipe; 
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'No recipe id provided.';
      this.isLoading = false;
      return;
    }
    if (id) {
      this.recipeService.getRecipeById(id).subscribe((recipe) => {
        this.recipe = recipe;
      });
    }

  }


}
