import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EquipeInterface } from '../../types/equipe.interface';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipes-cadastro',
  templateUrl: './equipes-cadastro.component.html',
  styleUrls: ['./equipes-cadastro.component.scss'],
})
export class equipesCadastroComponent implements OnInit {
  equipeId: number | null;
  equipesForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private equipeService: EquipeService,
    private router: Router
  ) {
    this.equipeId = null;
    this.equipesForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.equipeId = parseInt(id);
      this.equipeService.getequipe(this.equipeId).subscribe((equipe) => {
        this.equipesForm = this.createForm(equipe);
      });
    }
  }

  private createForm(equipe?: EquipeInterface) {
    return new FormGroup({
      nome: new FormControl(equipe?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      cidade: new FormControl(equipe?.cidade || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      sigla: new FormControl(equipe?.sigla || '', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
      ]),
      dataFundacao: new FormControl(
        equipe?.dataFundacao || new Date().toISOString()
      )
    });
  }

  salvar() {
    const equipe: EquipeInterface = {
      ...this.equipesForm.value,
      id: this.equipeId,
    };
    this.equipeService.salvar(equipe).subscribe(
      () => this.router.navigate(['equipes']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar a equipe ${equipe.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.equipesForm.get('nome');
  }

  get cidade() {
    return this.equipesForm.get('cidade');
  }

  get sigla() {
    return this.equipesForm.get('sigla');
  }
}
