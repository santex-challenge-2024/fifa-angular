import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CreatePlayer } from '../../models/create-player.model';
import { PlayersService } from '../../services/players.service';

@Component({
  selector: 'app-player-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './player-create.component.html',
  styleUrl: './player-create.component.scss',
})
export class PlayerCreateComponent implements OnInit {
  registerForm: FormGroup;
  registerPlayerSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private readonly playerService: PlayersService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      fifa_version: ['', Validators.required],
      fifa_update: ['', Validators.required],
      player_face_url: ['', [Validators.required]],
      long_name: ['', [Validators.required]],
      player_positions: ['', Validators.required],
      club_name: ['', Validators.required],
      nationality_name: ['', [Validators.required]],
      overall: ['', [Validators.required]],
      potential: ['', [Validators.required]],
      age: ['', [Validators.required]],
    });
    this.registerPlayerSubscription = new Subscription();
  }
  ngOnInit(): void {
    if (this.registerPlayerSubscription) {
      this.registerPlayerSubscription.unsubscribe();
    }
  }

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Datos del formulario:', formData);
      const newPlayer: CreatePlayer = {
        fifa_version: formData.fifa_version,
        fifa_update: formData.fifa_update,
        player_face_url: formData.player_face_url,
        long_name: formData.long_name,
        player_positions: formData.player_positions,
        club_name: formData.club_name,
        nationality_name: formData.nationality_name,
        overall: formData.overall,
        potential: formData.potential,
        age: formData.age,
      };

      this.registerPlayerSubscription = this.playerService
        .createPlayer(newPlayer)
        .subscribe({
          next: (respuesta: any) => {
            if (respuesta.status === 201) {
              //toast para mostrar registro exitoso
              this.snackBar.open('Registro exitoso', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
            }
          },
          error: (error) => {
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
          },
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}
