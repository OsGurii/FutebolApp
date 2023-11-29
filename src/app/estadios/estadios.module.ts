import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { estadiosPageRoutingModule } from './estadios-routing.module';

import { estadiosListaComponent } from './components/estadios-lista/estadios-lista.page';
import { estadiosCadastroComponent } from './components/estadios-cadastro/estadios-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    estadiosPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [estadiosListaComponent, estadiosCadastroComponent]
})
export class estadiosPageModule {}
