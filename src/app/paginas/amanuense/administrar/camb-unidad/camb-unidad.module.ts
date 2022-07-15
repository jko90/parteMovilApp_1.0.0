import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambUnidadPageRoutingModule } from './camb-unidad-routing.module';

import { CambUnidadPage } from './camb-unidad.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambUnidadPageRoutingModule,
    componentsModule
  ],
  declarations: [CambUnidadPage]
})
export class CambUnidadPageModule {}
