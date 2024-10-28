import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login-page/login.component';
import { RegisterComponent } from './features/auth/register/register-page/register.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
];
