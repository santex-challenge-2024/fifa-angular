import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../../services/players.service';
import { Subscription } from 'rxjs';
import { RadarComponent } from '../../shared/component/radar/radar.component';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [RadarComponent, CommonModule, BaseChartDirective],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss',
})
export class PlayerDetailsComponent implements OnInit {
  player: any;
  playerSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private readonly playerService: PlayersService
  ) {
    this.playerSubscription = new Subscription();
  }
  ngOnInit(): void {
    const playerId = this.route.snapshot.paramMap.get('id');
    console.log(playerId);

    if (playerId) {
      this.loadPlayerDetails(playerId);
    }
  }
  loadPlayerDetails(playerId: string) {
    this.playerSubscription = this.playerService
      .getOnePlayer(playerId)
      .subscribe((result: any) => {
        console.log(result.data);
        this.player = result.data;
      });
  }

  //Radar
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  // Etiquetas para las categorías del gráfico radar
  public radarChartLabels: string[] = [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ];

  // Datos del gráfico radar
  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: [65, 59, 90, 81, 56, 55, 40],
        label: 'Series A',
        borderColor: 'rgba(255, 99, 132, 1)', // Color de borde para la serie A
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo de la serie A
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Color de los puntos en la serie A
      },
      {
        data: [28, 48, 40, 19, 96, 27, 100],
        label: 'Series B',
        borderColor: 'rgba(54, 162, 235, 1)', // Color de borde para la serie B
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo de la serie B
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Color de los puntos en la serie B
      },
    ],
  };

  // Tipo de gráfico
  public radarChartType: ChartType = 'radar';

  // Evento cuando se hace clic en el gráfico
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log('Chart clicked', event, active);
  }

  // Evento cuando se pasa el ratón sobre el gráfico
  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log('Chart hovered', event, active);
  }
}
