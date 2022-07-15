import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPermisoPageRoutingModule } from './edit-permiso-routing.module';

import { EditPermisoPage } from './edit-permiso.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPermisoPageRoutingModule,
    componentsModule
  ],
  declarations: [EditPermisoPage]
})
export class EditPermisoPageModule {}
