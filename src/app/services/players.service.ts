import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  downloadCsv(pagination: Pagination): Observable<string> {
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;

    const params: any = { page, limit, format: 'csv' }; // Añadir el formato CSV

    // Agregar criterios de búsqueda según los parámetros
    if (pagination?.club) params.club = pagination.club;
    if (pagination?.name) params.name = pagination.name;
    if (pagination?.position) params.position = pagination.position;

    // Construcción de cadena de consulta (query)
    const queryString = new URLSearchParams(params).toString();

    // Configura las opciones para la solicitud
    const options = {
      headers: new HttpHeaders({
        Accept: 'text/csv',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
      responseType: 'text' as 'json', // Especificar que esperamos un texto
    };

    return this.http.get<string>(
      `${this.baseUrl}/players?${queryString}`,
      options
    );
  }
}
