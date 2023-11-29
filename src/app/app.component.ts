import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menus = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Estadios', url: '/estadios', icon: 'flag' },
    { title: 'Jogadores', url: '/jogadores', icon: 'person-circle' },
    { title: 'Campeonatos', url: '/campeonatos', icon: 'medal' },
    { title: 'Equipes', url: '/equipes', icon: 'star' },
    { title: 'Jogos', url: '/jogos', icon: 'calendar' },
  ];
  constructor() {}
}
