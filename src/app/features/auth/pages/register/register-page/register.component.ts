import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registerSubscription = new Subscription();
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
      // Aquí podrías llamar a un servicio para registrar al usuario
      this.registerSubscription = this.authService
        .register(newUser)
        .subscribe((respuesta: any) => {
          try {
            if (respuesta.status === 201) {
              this.router.navigate(['/auth/login']);
            }
          } catch (error) {
            console.log(error);
          }
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}
