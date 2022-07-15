import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFaltoPageRoutingModule } from './modal-falto-routing.module';

import { ModalFaltoPage } from './modal-falto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFaltoPageRoutingModule
  ],
  declarations: [ModalFaltoPage]
})
export class ModalFaltoPageModule {}
