import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabNumericaPageRoutingModule } from './tab-numerica-routing.module';

import { TabNumericaPage } from './tab-numerica.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabNumericaPageRoutingModule,
    componentsModule
  ],
  declarations: [TabNumericaPage]
})
export class TabNumericaPageModule {}
