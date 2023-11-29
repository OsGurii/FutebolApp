import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { campeonatosPageRoutingModule } from './campeonatos-routing.module';

import { campeonatosListaComponent } from './components/campeonatos-lista/campeonatos-lista.page';
import { campeonatosCadastroComponent } from './components/campeonatos-cadastro/campeonatos-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    campeonatosPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [campeonatosListaComponent, campeonatosCadastroComponent]
})
export class campeonatosPageModule {}
