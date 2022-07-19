import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloqueoPageRoutingModule } from './bloqueo-routing.module';

import { BloqueoPage } from './bloqueo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloqueoPageRoutingModule
  ],
  declarations: [BloqueoPage]
})
export class BloqueoPageModule {}
