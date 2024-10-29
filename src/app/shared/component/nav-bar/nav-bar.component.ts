import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {}
  playerList() {
    this.router.navigate(['/home/player-list']);
  }

  playerCreate() {
    this.router.navigate(['/home/player-create']);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/auth/login']);
  }
}
