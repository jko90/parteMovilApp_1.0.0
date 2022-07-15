import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecUnidadPageRoutingModule } from './selec-unidad-routing.module';

import { SelecUnidadPage } from './selec-unidad.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecUnidadPageRoutingModule,
    componentsModule
  ],
  declarations: [SelecUnidadPage]
})
export class SelecUnidadPageModule {}
