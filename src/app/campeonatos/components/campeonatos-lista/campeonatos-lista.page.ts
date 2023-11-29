import { Component} from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import { CampeonatoInterface } from '../../types/campeonatos.interface';
import { CampeonatoService } from '../../services/campeonatos.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos-lista.page.html',
  styleUrls: ['./campeonatos-lista.page.scss'],
})
export class campeonatosListaComponent
  implements ViewWillEnter
{
  campeonatos: CampeonatoInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private campeonatoService: CampeonatoService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.campeonatoService.getcampeonatos();
    observable.subscribe(
      (dados) => {
        this.campeonatos = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os campeonatos`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(campeonato: CampeonatoInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o campeonato ${campeonato.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(campeonato),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(campeonato: CampeonatoInterface) {
    if (campeonato.id) {
      this.campeonatoService.excluir(campeonato.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o campeonato ${campeonato.nome}`,
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
