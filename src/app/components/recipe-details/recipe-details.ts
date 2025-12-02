import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import {Router} from '@angular/router';
import { MinutesToTimePipe } from "../../pipes/minutes-to-time-pipe";

@Component({
  selector: 'app-recipe-details',
  imports: [CommonModule, MinutesToTimePipe],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit{

  recipe?: Recipe;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
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

  goBack(): void {
    this.router.navigate(['/recipes']);
  }

  editRecipe(id: string): void {
    this.router.navigate(['/recipes', id, 'edit']);
  }

  deleteRecipe(id: string): void {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}