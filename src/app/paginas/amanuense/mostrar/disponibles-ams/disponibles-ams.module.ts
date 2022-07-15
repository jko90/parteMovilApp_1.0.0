import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponiblesAmsPageRoutingModule } from './disponibles-ams-routing.module';

import { DisponiblesAmsPage } from './disponibles-ams.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponiblesAmsPageRoutingModule,
    componentsModule,
    PipesModule
  ],
  declarations: [DisponiblesAmsPage]
})
export class DisponiblesAmsPageModule {}
