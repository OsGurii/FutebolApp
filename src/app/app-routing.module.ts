import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'jogadores',
    loadChildren: () =>
      import('./jogadores/jogadores.module').then((m) => m.jogadoresPageModule),
  },
  {
    path: 'estadios',
    loadChildren: () =>
      import('./estadios/estadios.module').then((m) => m.estadiosPageModule),
  },
  {
    path: 'campeonatos',
    loadChildren: () =>
      import('./campeonatos/campeonatos.module').then((m) => m.campeonatosPageModule),
  },
  {
    path: 'equipes',
    loadChildren: () =>
      import('./equipes/equipes.module').then((m) => m.equipesPageModule),
  },
  {
    path: 'jogos',
    loadChildren: () =>
      import('./jogos/jogos.module').then((m) => m.jogosPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
