import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MealType } from '../models/recipe.model';

@Directive({
  selector: '[mealColor]'
})
export class MealColor implements OnInit {
  // getting meal type
  @Input('mealColor') meal!: MealType;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    let color = '';

    switch (this.meal) {
      case MealType.Breakfast:
        color = '#FFD700'; break;

      case MealType.Lunch:
        color = '#90EE90'; break;

      case MealType.Dinner:
        color = '#87CEEB'; break;

      case MealType.Snack:
        color = '#FFA500'; break;

      case MealType.Dessert:
        color = '#FFB6C1'; break;

      default:
        color = '#EEE'; break;
    }

    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.padding = '4px 8px';
    this.el.nativeElement.style.borderRadius = '6px';
    this.el.nativeElement.style.fontStyle = 'italic';
  }
}
