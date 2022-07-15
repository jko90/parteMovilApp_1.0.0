import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabDetalladaPageRoutingModule } from './tab-detallada-routing.module';

import { TabDetalladaPage } from './tab-detallada.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabDetalladaPageRoutingModule,
    componentsModule
  ],
  declarations: [TabDetalladaPage]
})
export class TabDetalladaPageModule {}
