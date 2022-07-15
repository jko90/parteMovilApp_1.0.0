import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsigSemanaPageRoutingModule } from './asig-semana-routing.module';

import { AsigSemanaPage } from './asig-semana.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsigSemanaPageRoutingModule,
    componentsModule
  ],
  declarations: [AsigSemanaPage]
})
export class AsigSemanaPageModule {}
