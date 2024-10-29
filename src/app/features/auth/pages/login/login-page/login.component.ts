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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSubscribe: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar
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
      this.loginSubscribe = this.authService
        .login(email, password)
        .subscribe((respuesta: any) => {
          console.log(respuesta.data.accessToken);

          if (respuesta.data.accessToken) {
            // Guardar el token en localStorage
            localStorage.setItem('token', respuesta.data.accessToken);

            //toast para mostrar registro exitoso
            this.snackBar.open('Login exitoso', 'Cerrar', {
              duration: 3000, // duración en milisegundos
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
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
