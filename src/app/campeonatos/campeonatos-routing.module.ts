import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { campeonatosCadastroComponent } from './components/campeonatos-cadastro/campeonatos-cadastro.component';

import { campeonatosListaComponent } from './components/campeonatos-lista/campeonatos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: campeonatosListaComponent
  },
  {
    path: 'cadastro',
    component: campeonatosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: campeonatosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class campeonatosPageRoutingModule {}
