import { Routes } from '@angular/router';
import { Login } from './login/login';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { UserDetail } from './user-detail/user-detail';
import { UserCreate } from './user-create/user-create';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'usuarios/crear', component: UserCreate },
  { path: 'usuarios', component: UserDashboard },
  { path: 'usuario/:id', component: UserDetail },
  { path: '', redirectTo: '/usuarios', pathMatch: 'full' },
  { path: '**', redirectTo: '/usuarios' }
];
