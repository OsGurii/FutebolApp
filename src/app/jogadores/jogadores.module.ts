import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { jogadoresPageRoutingModule } from './jogadores-routing.module';

import { jogadoresListaComponent } from './components/jogadores-lista/jogadores-lista.page';
import { jogadoresCadastroComponent } from './components/jogadores-cadastro/jogadores-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    jogadoresPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [jogadoresListaComponent, jogadoresCadastroComponent]
})
export class jogadoresPageModule {}
