import { Routes } from '@angular/router';
import { Login } from './login/login';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { UserDetail } from './user-detail/user-detail';
import { UserCreate } from './user-create/user-create';
import { UniversityDashboard } from './university-dashboard/university-dashboard';
import { UniversityCreate } from './university-create/university-create';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'usuarios/crear', component: UserCreate },
  { path: 'usuarios', component: UserDashboard },
  { path: 'usuario/:id', component: UserDetail },
  { path: 'universidades', component: UniversityDashboard },
  { path: 'universidades/crear', component: UniversityCreate },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
