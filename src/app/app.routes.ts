import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetails } from './components/recipe-details/recipe-details';
import { Home } from './components/home/home';
import { AddForm } from './components/add-form/add-form';
import { NotFound } from './components/not-found/not-found';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home
  },
  {
    path:'recipes',
    component: RecipeList,
  },
  {
    path: 'recipes/add',
    component: AddForm,
  },
  {
    path: 'recipes/:id/edit',
    component: AddForm
  },
  {
    path: 'recipes/:id',
    component: RecipeDetails,
  },
  {
    path: '**',
    component: NotFound
  }
];
