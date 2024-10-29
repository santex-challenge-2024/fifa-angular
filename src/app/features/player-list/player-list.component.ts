import { Component, OnInit } from '@angular/core';
import { CardPlayerComponent } from '../../shared/component/card-player/card-player.component';
import { PlayersService } from '../../services/players.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CardPlayerComponent, CommonModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit {
  playerSubscribe: Subscription;
  constructor(private readonly playerService: PlayersService) {
    this.playerSubscribe = new Subscription();
  }
  ngOnInit(): void {
    this.players();
  }

  playersData: any;

  players() {
    this.playerSubscribe = this.playerService
      .playerList()
      .subscribe((respuesta: any) => {
        console.log(respuesta.data);
        this.playersData = respuesta.data;
      });
  }
}
