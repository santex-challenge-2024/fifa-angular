import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environment/environment';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  private baseUrl = environments.apiUrl;

  playerList(pagination?: Pagination): Observable<any> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;

    const params: any = { page, limit };

    //si vienen datos, va agregando
    if (pagination?.club) params.club = pagination.club;
    if (pagination?.name) params.name = pagination.name;
    if (pagination?.position) params.position = pagination.position;
    if (pagination?.format) params.format = pagination.format;

    //construccion de cadena de consulta (query)
    const queryString = new URLSearchParams(params).toString();

    return this.http.get<any>(`${this.baseUrl}/players?${queryString}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
