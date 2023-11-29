import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { equipesPageRoutingModule } from './equipes-routing.module';

import { equipesListaComponent } from './components/equipes-lista/equipes-lista.page';
import { equipesCadastroComponent } from './components/equipes-cadastro/equipes-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    equipesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [equipesListaComponent, equipesCadastroComponent]
})
export class equipesPageModule {}
