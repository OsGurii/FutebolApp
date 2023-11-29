import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JogadorInterface } from '../types/jogador.interface';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {

  private url = 'http://localhost:3000/jogadores';

  constructor(
    private httpClient: HttpClient
  ) {}

  getjogadores(): Observable<JogadorInterface[]> {
    return this.httpClient.get<JogadorInterface[]>(this.url);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getjogador(id: number): Observable<JogadorInterface> {
    return this.httpClient.get<JogadorInterface>(`${this.url}/${id}`);
  }

  private adicionar(jogador: JogadorInterface)  {
    return this.httpClient.post(this.url, jogador);
  }

  private atualizar(jogador: JogadorInterface) {
    return this.httpClient.put(`${this.url}/${jogador.id}`, jogador);
  }

  salvar(jogador: JogadorInterface) {
    if(jogador.id) {
      return this.atualizar(jogador);
    } else {
      return this.adicionar(jogador);
    }
  }
}
