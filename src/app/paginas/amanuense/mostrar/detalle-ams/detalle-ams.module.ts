import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAmsPageRoutingModule } from './detalle-ams-routing.module';

import { DetalleAmsPage } from './detalle-ams.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAmsPageRoutingModule,
    componentsModule
  ],
  declarations: [DetalleAmsPage]
})
export class DetalleAmsPageModule {}
