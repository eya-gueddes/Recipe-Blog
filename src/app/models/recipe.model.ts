export interface Recipe {
  id: string;
  title: string;
  description: string;
  meal: MealType;
  ingredients: Ingredient[];
  instructions: instruction[];
  prepTime?: number; // in minutes
  cookTime?: number; // in minutes
  servings: number;
  imageUrl?: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface instruction {
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
