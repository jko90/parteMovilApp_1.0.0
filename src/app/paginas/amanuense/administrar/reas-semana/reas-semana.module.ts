import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReasSemanaPageRoutingModule } from './reas-semana-routing.module';

import { ReasSemanaPage } from './reas-semana.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReasSemanaPageRoutingModule,
    componentsModule
  ],
  declarations: [ReasSemanaPage]
})
export class ReasSemanaPageModule {}
