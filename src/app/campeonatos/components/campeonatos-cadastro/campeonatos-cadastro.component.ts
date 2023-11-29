import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CampeonatoInterface } from '../../types/campeonatos.interface';
import { CampeonatoService } from '../../services/campeonatos.service';
import { AbrangenciaEnum } from '../../types/abrangencia.enum';
import { EstadioInterface } from 'src/app/estadios/types/estadio.interface';
import { EstadioService } from 'src/app/estadios/services/estadio.service';
import { EquipeService } from 'src/app/equipes/services/equipe.service';
import { EquipeInterface } from 'src/app/equipes/types/equipe.interface';

@Component({
  selector: 'app-campeonatos-cadastro',
  templateUrl: './campeonatos-cadastro.component.html',
  styleUrls: ['./campeonatos-cadastro.component.scss'],
})
export class campeonatosCadastroComponent implements OnInit {
  campeonatoId: number | null;
  campeonatosForm: FormGroup;
  estadios: EstadioInterface[] = [];
  equipes: EquipeInterface[] = [];

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private campeonatoService: CampeonatoService,
    private estadioService: EstadioService,
    private equipeService: EquipeService,
    private router: Router
  ) {
    this.campeonatoId = null;
    this.campeonatosForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.campeonatoId = parseInt(id);
      this.campeonatoService.getcampeonato(this.campeonatoId).subscribe((campeonato) => {
        this.campeonatosForm = this.createForm(campeonato);
      });
    }
    const observableEstadio = this.estadioService.getestadios();
    observableEstadio.subscribe(
      (dados) => {
        this.estadios = dados;
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
    const observableEquipe = this.equipeService.getequipes();
    observableEquipe.subscribe(
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

  private createForm(campeonato?: CampeonatoInterface) {
    return new FormGroup({
      nome: new FormControl(campeonato?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataInicio: new FormControl(
        campeonato?.dataInicio || new Date().toISOString()
      ),
      dataFim: new FormControl(
        campeonato?.dataFim || new Date().toISOString()
      ),
      abrangencia: new FormControl(
        campeonato?.abrangencia || AbrangenciaEnum.AMADOR,
        Validators.required
      ),
      estadio: new FormControl(
        campeonato?.estadio,
        Validators.required
      ),
      equipes: new FormControl(
        campeonato?.equipes,
        Validators.required
      )
    });
  }

  salvar() {
    const campeonato: CampeonatoInterface = {
      ...this.campeonatosForm.value,
      id: this.campeonatoId,
    };
    this.campeonatoService.salvar(campeonato).subscribe(
      () => this.router.navigate(['campeonatos']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o campeonato ${campeonato.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.campeonatosForm.get('nome');
  }
}
