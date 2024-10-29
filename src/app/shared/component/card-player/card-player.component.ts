import { Component, Input } from '@angular/core';
import { Player } from '../../../models/player.model';

@Component({
  selector: 'app-card-player',
  standalone: true,
  imports: [],
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.scss',
})
export class CardPlayerComponent {
  @Input() player: any;
}
