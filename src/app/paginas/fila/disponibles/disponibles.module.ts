import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponiblesPageRoutingModule } from './disponibles-routing.module';

import { DisponiblesPage } from './disponibles.page';
import { componentsModule } from 'src/app/componentes/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponiblesPageRoutingModule,
    componentsModule,
    PipesModule
  ],
  declarations: [DisponiblesPage]
})
export class DisponiblesPageModule {}
