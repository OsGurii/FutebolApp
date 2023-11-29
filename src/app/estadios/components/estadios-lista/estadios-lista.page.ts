import { Component } from '@angular/core';
import {
  AlertController,
  ToastController,
  ViewWillEnter,
} from '@ionic/angular';
import { EstadioInterface } from '../../types/estadio.interface';
import { EstadioService } from '../../services/estadio.service';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios-lista.page.html',
  styleUrls: ['./estadios-lista.page.scss'],
})
export class estadiosListaComponent
  implements ViewWillEnter
{
  estadios: EstadioInterface[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private estadioService: EstadioService
  ) {}

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    const observable = this.estadioService.getestadios();
    observable.subscribe(
      (dados) => {
        this.estadios = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os estadios`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  confirmarExclusao(estadio: EstadioInterface) {
    this.alertController
      .create({
        header: 'Confirmação de exclusão',
        message: `Deseja excluir o estadio ${estadio.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.excluir(estadio),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alerta) => alerta.present());
  }

  abrirMapa(estadio: string) {
    const localizacao = encodeURI(estadio);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${localizacao}`;
    
    window.open(mapsUrl, '_system');
  }

  private excluir(estadio: EstadioInterface) {
    if (estadio.id) {
      this.estadioService.excluir(estadio.id).subscribe(
        () => this.listar(),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível excluir o estadio ${estadio.nome}`,
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
