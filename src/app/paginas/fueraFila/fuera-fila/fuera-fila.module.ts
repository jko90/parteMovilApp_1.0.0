import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FueraFilaPageRoutingModule } from './fuera-fila-routing.module';

import { FueraFilaPage } from './fuera-fila.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FueraFilaPageRoutingModule,
    componentsModule
  ],
  declarations: [FueraFilaPage]
})
export class FueraFilaPageModule {}
