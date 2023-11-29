import { Component } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import { JogadorInterface } from '../../types/jogador.interface';
import { JogadorService } from '../../services/jogador.service';

@Component({
  selector: 'app-jogadores',
  templateUrl: './jogadores-lista.page.html',
  styleUrls: ['./jogadores-lista.page.scss'],
})
export class jogadoresListaComponent
  implements ViewWillEnter
{
  jogadores: JogadorInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private jogadorService: JogadorService,
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.jogadorService.getjogadores();
    observable.subscribe(
      (dados) => {
        this.jogadores = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os jogadores`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(jogador: JogadorInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o jogador ${jogador.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(jogador),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(jogador: JogadorInterface) {
    if (jogador.id) {
      this.jogadorService.excluir(jogador.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o jogador ${jogador.nome}`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }
  }
}
