import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardPlayerComponent } from '../../shared/component/card-player/card-player.component';
import { PlayersService } from '../../services/players.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../models/pagination.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CardPlayerComponent, CommonModule, FormsModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss',
})
export class PlayerListComponent implements OnInit, OnDestroy {
  playerSubscribe: Subscription;
  currentPage: number = 1;
  searchType: string = 'name';
  searchQuery: string = '';
  pagination: Pagination = {};

  constructor(private readonly playerService: PlayersService) {
    this.playerSubscribe = new Subscription();
  }
  ngOnDestroy(): void {
    if (this.playerSubscribe) {
      this.playerSubscribe.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.loadPlayers();
  }

  playersData: any;

  loadPlayers() {
    const pagination: Pagination = {
      page: this.currentPage,
      limit: 10, // Ajusta el límite según tu necesidad
    };

    //si se ejecuta el buscar analiza los datos entrantes
    if (this.searchType === 'name') {
      pagination.name = this.searchQuery;
    } else if (this.searchType === 'club') {
      pagination.club = this.searchQuery;
    } else if (this.searchType === 'position') {
      pagination.position = this.searchQuery;
    }

    this.players(pagination);
  }

  nextPage() {
    this.currentPage++;
    this.loadPlayers();
  }

  backPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPlayers();
    }
  }

  players(pagination: Pagination) {
    this.playerSubscribe = this.playerService
      .playerList(pagination)
      .subscribe((respuesta: any) => {
        console.log(respuesta.data);
        this.playersData = respuesta.data;
      });
  }

  //buscador
  search() {
    this.currentPage = 1;
    this.loadPlayers();
  }
}
