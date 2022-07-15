import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNovedadPageRoutingModule } from './edit-novedad-routing.module';

import { EditNovedadPage } from './edit-novedad.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditNovedadPageRoutingModule,
    componentsModule
  ],
  declarations: [EditNovedadPage]
})
export class EditNovedadPageModule {}
