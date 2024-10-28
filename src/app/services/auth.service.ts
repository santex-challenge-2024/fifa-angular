import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../models/registerUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, {
      email,
      password,
    });
  }

  logOut() {
    localStorage.removeItem('token');
  }

  register(registerUser: RegisterUser): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/registerUser`,
      registerUser
    );
  }
}
