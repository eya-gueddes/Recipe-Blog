import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { RecipeDetails } from './components/recipe-details/recipe-details';
import { Home } from './components/home/home';

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
    }
];
