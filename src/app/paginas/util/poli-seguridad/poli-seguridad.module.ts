import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliSeguridadPageRoutingModule } from './poli-seguridad-routing.module';

import { PoliSeguridadPage } from './poli-seguridad.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliSeguridadPageRoutingModule,
    componentsModule
  ],
  declarations: [PoliSeguridadPage]
})
export class PoliSeguridadPageModule {}
