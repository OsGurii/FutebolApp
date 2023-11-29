import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { jogadoresCadastroComponent } from './components/jogadores-cadastro/jogadores-cadastro.component';

import { jogadoresListaComponent } from './components/jogadores-lista/jogadores-lista.page';

const routes: Routes = [
  {
    path: '',
    component: jogadoresListaComponent
  },
  {
    path: 'cadastro',
    component: jogadoresCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: jogadoresCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class jogadoresPageRoutingModule {}
