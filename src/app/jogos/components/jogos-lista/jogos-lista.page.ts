import { Component } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import { JogoInterface } from '../../types/jogo.interface';
import { JogoService } from '../../services/jogo.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos-lista.page.html',
  styleUrls: ['./jogos-lista.page.scss'],
})
export class jogosListaComponent
  implements ViewWillEnter
{
  jogos: JogoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private jogoservice: JogoService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.jogoservice.getjogos();
    observable.subscribe(
      (dados) => {
        this.jogos = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os jogos`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(jogo: JogoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o jogo?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(jogo),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(jogo: JogoInterface) {
    if (jogo.id) {
      this.jogoservice.excluir(jogo.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o jogo`,
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
