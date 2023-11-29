import { Component } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import { EquipeInterface } from '../../types/equipe.interface';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes-lista.page.html',
  styleUrls: ['./equipes-lista.page.scss'],
})
export class equipesListaComponent
  implements ViewWillEnter
{
  equipes: EquipeInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private equipeService: EquipeService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.equipeService.getequipes();
    observable.subscribe(
      (dados) => {
        this.equipes = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os equipes`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(equipe: EquipeInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o equipe ${equipe.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(equipe),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  private excluir(equipe: EquipeInterface) {
    if (equipe.id) {
      this.equipeService.excluir(equipe.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o equipe ${equipe.nome}`,
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
