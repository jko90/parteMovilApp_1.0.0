import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPermLapPageRoutingModule } from './edit-perm-lap-routing.module';

import { EditPermLapPage } from './edit-perm-lap.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPermLapPageRoutingModule,
    componentsModule
  ],
  declarations: [EditPermLapPage]
})
export class EditPermLapPageModule {}
