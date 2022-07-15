import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostPermLapPageRoutingModule } from './most-perm-lap-routing.module';

import { MostPermLapPage } from './most-perm-lap.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostPermLapPageRoutingModule,
    componentsModule
  ],
  declarations: [MostPermLapPage]
})
export class MostPermLapPageModule {}
