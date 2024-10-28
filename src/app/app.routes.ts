import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login-page/login.component';
import { RegisterComponent } from './features/auth/pages/register/register-page/register.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
