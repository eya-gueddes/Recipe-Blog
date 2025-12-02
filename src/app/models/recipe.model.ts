export interface Recipe {
  id: string;
  title: string;
  description: string;
  meal: MealType;
  createdAt: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  prepTime?: number; 
  cookTime?: number; 
  servings: number;
  imageUrl?: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Instruction {
  step: number;
  description: string;
}

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack',
  Dessert = 'Dessert'
}
