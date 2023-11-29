import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { JogoInterface } from '../../types/jogo.interface';
import { JogoService } from '../../services/jogo.service';
import { EquipeInterface } from 'src/app/equipes/types/equipe.interface';
import { EquipeService } from 'src/app/equipes/services/equipe.service';
import { CampeonatoInterface } from 'src/app/campeonatos/types/campeonatos.interface';
import { CampeonatoService } from 'src/app/campeonatos/services/campeonatos.service';

@Component({
  selector: 'app-jogos-cadastro',
  templateUrl: './jogos-cadastro.component.html',
  styleUrls: ['./jogos-cadastro.component.scss'],
})
export class jogosCadastroComponent implements OnInit {
  jogoId: number | null;
  jogosForm: FormGroup;

  equipes: EquipeInterface[] = [];
  campeonatos: CampeonatoInterface[] = [];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private jogoservice: JogoService,
    private campeonatoService: CampeonatoService,
    private equipeService: EquipeService,
    private router: Router
  ) {
    this.jogoId = null;
    this.jogosForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.jogoId = parseInt(id);
      this.jogoservice.getjogo(this.jogoId).subscribe((jogo) => {
        this.jogosForm = this.createForm(jogo);
      });
    }
    const observableEquipe = this.equipeService.getequipes();
    observableEquipe.subscribe(
      (dados) => {
        this.equipes = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os estádios`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
    const observableCampeonato = this.campeonatoService.getcampeonatos();
    observableCampeonato.subscribe(
      (dados) => {
        this.campeonatos = dados;
      },
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível listar os estádios`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  private createForm(jogo?: JogoInterface) {
    return new FormGroup({
      golVisitante: new FormControl(
        jogo?.golVisitante || 0,
        [Validators.min(0)]
      ),
      golMandante: new FormControl(
        jogo?.golMandante || 0,
        [Validators.min(0)]
      ),
      visitante: new FormControl(
        jogo?.visitante,
        Validators.required
      ),
      mandante: new FormControl(
        jogo?.mandante,
        Validators.required
      ),
      campeonato: new FormControl(
        jogo?.campeonato,
        Validators.required
      )
    });
  }

  salvar() {
    const jogo: JogoInterface = {
      ...this.jogosForm.value,
      id: this.jogoId,
    }
    if(jogo.mandante != jogo.visitante){
      this.jogoservice.salvar(jogo).subscribe(
        () => this.router.navigate(['jogos']),
        (erro) => {
          console.error(erro);
          this.toastController
            .create({
              message: `Não foi possível salvar o jogo`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
        }
      );
    }else{
      this.toastController
            .create({
              message: `Verifique se as equipes estão iguais!`,
              duration: 5000,
              keyboardClose: true,
              color: 'danger',
            })
            .then((t) => t.present());
    }
  }

  get nome() {
    return this.jogosForm.get('nome');
  }

  get golVisitante() {
    return this.jogosForm.get('golVisitante');
  }

  get golMandante() {
    return this.jogosForm.get('golMandante');
  }

  get mandante() {
    return this.jogosForm.get('mandante');
  }
}
