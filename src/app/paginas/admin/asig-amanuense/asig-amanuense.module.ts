import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsigAmanuensePageRoutingModule } from './asig-amanuense-routing.module';

import { AsigAmanuensePage } from './asig-amanuense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsigAmanuensePageRoutingModule
  ],
  declarations: [AsigAmanuensePage]
})
export class AsigAmanuensePageModule {}
