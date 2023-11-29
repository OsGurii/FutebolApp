import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JogoInterface } from '../types/jogo.interface';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  private url = 'http://localhost:3000/jogos';

  constructor(
    private httpClient: HttpClient
  ) {}

  getjogos(): Observable<JogoInterface[]> {
    return this.httpClient.get<JogoInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getjogo(id: number): Observable<JogoInterface> {
    return this.httpClient.get<JogoInterface>(`${this.url}/${id}`);
  }

  private adicionar(jogo: JogoInterface)  {
    return this.httpClient.post(this.url, jogo);
  }

  private atualizar(jogo: JogoInterface) {
    return this.httpClient.put(`${this.url}/${jogo.id}`, jogo);
  }

  salvar(jogo: JogoInterface) {
    if(jogo.id) {
      return this.atualizar(jogo);
    } else {
      return this.adicionar(jogo);
    }
  }
}
