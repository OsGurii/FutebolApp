import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { equipesCadastroComponent } from './components/equipes-cadastro/equipes-cadastro.component';

import { equipesListaComponent } from './components/equipes-lista/equipes-lista.page';

const routes: Routes = [
  {
    path: '',
    component: equipesListaComponent
  },
  {
    path: 'cadastro',
    component: equipesCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: equipesCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class equipesPageRoutingModule {}
