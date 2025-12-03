import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';

function requiredFormArray(control: AbstractControl) {
  const arr = control as FormArray;
  return arr && arr.length > 0 ? null : { required: true };
}

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm implements OnInit {
  addForm!: FormGroup;
  editingId: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      meal: ['', Validators.required],
      prepTime: [0, Validators.min(0)],
      cookTime: [0, Validators.min(0)],
      servings: [1, Validators.min(1)],
      imageUrl: [''],
      ingredients: this.fb.array([], requiredFormArray),
      instructions: this.fb.array([], requiredFormArray),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editingId = id;
        this.loadRecipeForEdit(id);
      }
    });
  }

  get ingredients() {
    return this.addForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.addForm.get('instructions') as FormArray;
  }

  addIngredient(ing?: any) {
    this.ingredients.push(
      this.fb.group({
        name: [ing?.name || '', Validators.required],
        quantity: [ing?.quantity || '', Validators.required],
      })
    );
  }

  addInstruction(ins?: any) {
    this.instructions.push(
      this.fb.group({
        step: [ins?.step || this.instructions.length + 1],
        description: [ins?.description || '', Validators.required],
      })
    );
  }

  
removeIngredient(index: number) {
  this.ingredients.removeAt(index);
  this.ingredients.markAsDirty();
  this.ingredients.updateValueAndValidity();
}

removeInstruction(index: number) {
  this.instructions.removeAt(index);
  this.instructions.markAsDirty();
  this.instructions.updateValueAndValidity();
}
  private loadRecipeForEdit(id: string) {
    this.recipeService.getRecipeById(id).subscribe((recipe: Recipe) => {
      this.addForm.patchValue({
        title: recipe.title,
        description: recipe.description,
        meal: recipe.meal,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        imageUrl: recipe.imageUrl,
      });

      this.ingredients.clear();
      this.instructions.clear();

      recipe.ingredients.forEach(ing => this.addIngredient(ing));
      recipe.instructions.forEach(ins => this.addInstruction(ins));
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    const formValue = this.addForm.value;

    if (this.editingId) {
      const updated: Recipe = { id: this.editingId, ...formValue };
      this.recipeService
        .updateRecipe(this.editingId, updated)
        .subscribe(() => this.router.navigate(['/recipes', this.editingId]));
    } else {
      this.recipeService
        .addRecipe(formValue)
        .subscribe(() => this.router.navigate(['/recipes']));
    }
  }
}
