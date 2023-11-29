import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EstadioInterface } from '../../types/estadio.interface';
import { EstadioService } from '../../services/estadio.service';
import { GramadoEnum } from '../../types/gramado.enum';

@Component({
  selector: 'app-estadios-cadastro',
  templateUrl: './estadios-cadastro.component.html',
  styleUrls: ['./estadios-cadastro.component.scss'],
})
export class estadiosCadastroComponent implements OnInit {
  estadioId: number | null;
  estadiosForm: FormGroup;

  constructor(
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private estadioService: EstadioService,
    private router: Router
  ) {
    this.estadioId = null;
    this.estadiosForm = this.createForm();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.estadioId = parseInt(id);
      this.estadioService.getestadio(this.estadioId).subscribe((estadio) => {
        this.estadiosForm = this.createForm(estadio);
      });
    }
  }

  private createForm(estadio?: EstadioInterface) {
    return new FormGroup({
      nome: new FormControl(estadio?.nome || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150),
      ]),
      dataFundacao: new FormControl(
        estadio?.dataFundacao || new Date().toISOString()
      ),
      endereco: new FormControl(estadio?.endereco || '', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(400),
      ]),
      capacidade: new FormControl(
        estadio?.capacidade || 1000,
        [Validators.min(1000)]
      ),
      gramado: new FormControl(
        estadio?.gramado || GramadoEnum.GRAMA,
        Validators.required
      ),
    });
  }

  salvar() {
    const estadio: EstadioInterface = {
      ...this.estadiosForm.value,
      id: this.estadioId,
    };
    this.estadioService.salvar(estadio).subscribe(
      () => this.router.navigate(['estadios']),
      (erro) => {
        console.error(erro);
        this.toastController
          .create({
            message: `Não foi possível salvar o estadio ${estadio.nome}`,
            duration: 5000,
            keyboardClose: true,
            color: 'danger',
          })
          .then((t) => t.present());
      }
    );
  }

  get nome() {
    return this.estadiosForm.get('nome');
  }

  get endereco() {
    return this.estadiosForm.get('endereco');
  }

  get capacidade() {
    return this.estadiosForm.get('capacidade');
  }
}
