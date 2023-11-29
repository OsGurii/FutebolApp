import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { JogadorInterface } from '../../types/jogador.interface';
import { JogadorService } from '../../services/jogador.service';
import { GeneroEnum } from '../../types/genero.enum';
import { PosicaoEnum } from '../../types/posicao.enum';
import { EquipeService } from 'src/app/equipes/services/equipe.service';
import { EquipeInterface } from 'src/app/equipes/types/equipe.interface';

@Component({
  selector: 'app-jogadores-cadastro',
  templateUrl: './jogadores-cadastro.component.html',
  styleUrls: ['./jogadores-cadastro.component.scss'],
})
export class jogadoresCadastroComponent implements OnInit {
  jogadorId: number | null;
  jogadoresForm: FormGroup;
  equipes: EquipeInterface[] = [];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private jogadorService: JogadorService,
    private equipeService: EquipeService,
    private router: Router
  ) {
    this.jogadorId = null;
    this.jogadoresForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.jogadorId = parseInt(id);
      this.jogadorService.getjogador(this.jogadorId).subscribe((jogador) => {
        this.jogadoresForm = this.createForm(jogador);
      });
    }
    const observable = this.equipeService.getequipes();
    observable.subscribe(
      (dados) => {
        this.equipes = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar as equipes`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  private createForm(jogador?: JogadorInterface) {
    return new FormGroup({
      nome: new FormControl(jogador?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataNascimento: new FormControl(
        jogador?.dataNascimento || new Date().toISOString()
      ),
      genero: new FormControl(
        jogador?.genero || GeneroEnum.FEMININO,
        Validators.required
      ),
      posicao: new FormControl(
        jogador?.posicao || PosicaoEnum.GOLEIRO,
        Validators.required
      ),
      equipe: new FormControl(
        jogador?.equipe,
        Validators.required
      )
    });
  }

  salvar() {
    const jogador: JogadorInterface = {
      ...this.jogadoresForm.value,
      id: this.jogadorId,
    };
    this.jogadorService.salvar(jogador).subscribe(
      () => this.router.navigate(['jogadores']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o jogador ${jogador.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.jogadoresForm.get('nome');
  }
}
