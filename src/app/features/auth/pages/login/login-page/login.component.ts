import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.loginSubscribe = new Subscription();
  }

  ngOnDestroy(): void {
    if (this.loginSubscribe) {
      this.loginSubscribe.unsubscribe();
    }
  }
  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Datos del formulario:');
      this.loginSubscribe = this.authService
        .login(email, password)
        .subscribe((respuesta: any) => {
          console.log(respuesta.data.accessToken);

          if (respuesta.data.accessToken) {
            // Guardar el token en localStorage
            localStorage.setItem('token', respuesta.data.accessToken);

            // Redireccionar después de una respuesta exitosa
            this.router.navigate(['/home']);
          } else {
            console.error(respuesta);
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
}
