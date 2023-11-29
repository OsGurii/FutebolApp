import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { jogosPageRoutingModule } from './jogos-routing.module';

import { jogosListaComponent } from './components/jogos-lista/jogos-lista.page';
import { jogosCadastroComponent } from './components/jogos-cadastro/jogos-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    jogosPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [jogosListaComponent, jogosCadastroComponent]
})
export class jogosPageModule {}
