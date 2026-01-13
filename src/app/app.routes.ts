import { Routes } from '@angular/router';
import { HomePage } from './domains/home-page/home-page';
import { Register } from './core/auth/pages/register/register';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: Register },
];
