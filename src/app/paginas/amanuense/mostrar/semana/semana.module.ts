import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemanaPageRoutingModule } from './semana-routing.module';

import { SemanaPage } from './semana.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemanaPageRoutingModule,
    componentsModule
  ],
  declarations: [SemanaPage]
})
export class SemanaPageModule {}
