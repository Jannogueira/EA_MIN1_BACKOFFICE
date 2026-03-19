import { Routes } from '@angular/router';
import { Login } from './login/login';
import { UserDashboard } from './user-dashboard/user-dashboard';
import { UserDetail } from './user-detail/user-detail';

export const routes: Routes = [
  //{ path: 'login', component: Login },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/login' },
  { path: '', component: UserDashboard },
  { path: 'dashboard', component: UserDashboard },
  { path: 'user/:id', component: UserDetail }
];
