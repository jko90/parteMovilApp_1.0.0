import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalNovedadPageRoutingModule } from './modal-novedad-routing.module';

import { ModalNovedadPage } from './modal-novedad.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalNovedadPageRoutingModule,
    componentsModule
  ],
  declarations: [ModalNovedadPage]
})
export class ModalNovedadPageModule {}
