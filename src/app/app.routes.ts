import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Navbar } from './navbar/navbar';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
