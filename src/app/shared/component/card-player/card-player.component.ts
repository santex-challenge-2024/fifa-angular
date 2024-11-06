import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() playerSelected = new EventEmitter<any>();

  selectPlayer() {
    this.playerSelected.emit(this.player);
  }
}
