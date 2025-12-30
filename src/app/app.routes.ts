import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { RecipeDetailsPage } from './recipe-details/recipe-details.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'details/:id',
    component: RecipeDetailsPage,
  },
];
