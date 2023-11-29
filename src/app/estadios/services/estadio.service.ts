import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadioInterface } from '../types/estadio.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadioService {

  private url = 'http://localhost:3000/estadios';

  constructor(
    private httpClient: HttpClient
  ) {}

  getestadios(): Observable<EstadioInterface[]> {
    return this.httpClient.get<EstadioInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getestadio(id: number): Observable<EstadioInterface> {
    return this.httpClient.get<EstadioInterface>(`${this.url}/${id}`);
  }

  private adicionar(estadio: EstadioInterface)  {
    return this.httpClient.post(this.url, estadio);
  }

  private atualizar(estadio: EstadioInterface) {
    return this.httpClient.put(`${this.url}/${estadio.id}`, estadio);
  }

  salvar(estadio: EstadioInterface) {
    if(estadio.id) {
      return this.atualizar(estadio);
    } else {
      return this.adicionar(estadio);
    }
  }
}
