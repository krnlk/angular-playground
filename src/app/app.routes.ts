import { Routes } from '@angular/router';
import { Login } from './core/auth/pages/login/login';
import { Register } from './core/auth/pages/register/register';
import { HomePage } from './domains/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
];
