import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreaFuerFilaPageRoutingModule } from './crea-fuer-fila-routing.module';

import { CreaFuerFilaPage } from './crea-fuer-fila.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreaFuerFilaPageRoutingModule,
    componentsModule

  ],
  declarations: [CreaFuerFilaPage]
})
export class CreaFuerFilaPageModule {}
