import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostNovedadesPageRoutingModule } from './most-novedades-routing.module';

import { MostNovedadesPage } from './most-novedades.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostNovedadesPageRoutingModule,
    componentsModule
  ],
  declarations: [MostNovedadesPage]
})
export class MostNovedadesPageModule {}
