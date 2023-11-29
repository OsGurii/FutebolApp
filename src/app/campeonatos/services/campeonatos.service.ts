import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CampeonatoInterface } from '../types/campeonatos.interface';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {

  private url = 'http://localhost:3000/campeonatos';

  constructor(
    private httpClient: HttpClient
  ) {}

  getcampeonatos(): Observable<CampeonatoInterface[]> {
    return this.httpClient.get<CampeonatoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getcampeonato(id: number): Observable<CampeonatoInterface> {
    return this.httpClient.get<CampeonatoInterface>(`${this.url}/${id}`);
  }

  private adicionar(campeonato: CampeonatoInterface)  {
    return this.httpClient.post(this.url, campeonato);
  }

  private atualizar(campeonato: CampeonatoInterface) {
    return this.httpClient.put(`${this.url}/${campeonato.id}`, campeonato);
  }

  salvar(campeonato: CampeonatoInterface) {
    if(campeonato.id) {
      return this.atualizar(campeonato);
    } else {
      return this.adicionar(campeonato);
    }
  }
}
