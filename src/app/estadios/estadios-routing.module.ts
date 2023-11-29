import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { estadiosCadastroComponent } from './components/estadios-cadastro/estadios-cadastro.component';

import { estadiosListaComponent } from './components/estadios-lista/estadios-lista.page';

const routes: Routes = [
  {
    path: '',
    component: estadiosListaComponent
  },
  {
    path: 'cadastro',
    component: estadiosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: estadiosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class estadiosPageRoutingModule {}
