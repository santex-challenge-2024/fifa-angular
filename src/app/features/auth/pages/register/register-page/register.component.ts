import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterUser } from '../../../../../models/registerUser.model';
import { AuthService } from '../../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  registerSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerSubscription = new Subscription();
  }
  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Datos del formulario:', formData);
      const newUser: RegisterUser = {
        first_name: formData.nombre,
        last_name: formData.apellido,
        email: formData.email,
        password: formData.password,
      };

      this.registerSubscription = this.authService.register(newUser).subscribe(
        (respuesta: any) => {
          try {
            if (respuesta.status === 201) {
              //toast para mostrar registro exitoso
              this.snackBar.open('Registro exitoso', 'Cerrar', {
                duration: 3000, // duración en milisegundos
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              this.router.navigate(['/auth/login']);
            }
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          //toast para mostrar fallo en registro
          this.snackBar.open(
            'Error en el registro. Inténtalo nuevamente.',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            }
          );
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
