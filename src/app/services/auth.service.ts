import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/registerUser.model';
import { environments } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = environments.apiUrl;

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, {
      email,
      password,
    });
  }

  logOut() {
    localStorage.removeItem('token');
  }

  //validacion usuario logeado (uso en authGuard)
  loggedIn() {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/registerUser`,
      registerUser
    );
  }
}
