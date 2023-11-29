import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { jogosCadastroComponent } from './components/jogos-cadastro/jogos-cadastro.component';

import { jogosListaComponent } from './components/jogos-lista/jogos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: jogosListaComponent
  },
  {
    path: 'cadastro',
    component: jogosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: jogosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class jogosPageRoutingModule {}
