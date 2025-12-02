import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetails } from './components/recipe-details/recipe-details';
import { Home } from './components/home/home';
import { AddForm } from './components/add-form/add-form';


export const routes: Routes = [
  {
        path:'recipes',
        component: RecipeList,
    },
    {
        path: 'recipes/:id',
        component: RecipeDetails,
    },
    {
        path: '', pathMatch: 'full', component: Home
    },
    {
        path: 'add',
        component: AddForm,
    }
];
