import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EfectivosPageRoutingModule } from './efectivos-routing.module';

import { EfectivosPage } from './efectivos.page';
import { componentsModule } from 'src/app/componentes/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EfectivosPageRoutingModule,
    componentsModule,
    PipesModule
  ],
  declarations: [EfectivosPage]
})
export class EfectivosPageModule {}
