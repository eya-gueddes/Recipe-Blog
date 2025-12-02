import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm {
  addForm!: FormGroup;
   constructor(private fb: FormBuilder,
    private router: Router,
    private recipeService: RecipeService) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      meal: ['', Validators.required],
      prepTime: [0, Validators.min(0)],
      cookTime: [0, Validators.min(0)],
      servings: [1, Validators.min(1)],
      imageUrl: [''],

      ingredients: this.fb.array([]),
      instructions: this.fb.array([])
    });
  }
 get ingredients() {
    return this.addForm.get('ingredients') as FormArray;
  }

  addIngredient(ing?: any) {
    this.ingredients.push(
      this.fb.group({
        name: [ing?.name || '', Validators.required],
        quantity: [ing?.quantity || '', Validators.required]
      })
    );
  }

  get instructions() {
    return this.addForm.get('instructions') as FormArray;
  }

  addInstruction(ins?: any) {
    this.instructions.push(
      this.fb.group({
        step: [ins?.step || this.instructions.length + 1],
        description: [ins?.description || '', Validators.required]
      })
    );
  }

onSubmit() {
  if (this.addForm.invalid) {
    this.addForm.markAllAsTouched();
    return;
  }

  this.recipeService
    .addRecipe(this.addForm.value)
    .subscribe(() => this.router.navigate(['/recipes']));
}

}
