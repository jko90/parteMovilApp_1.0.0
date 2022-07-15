import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NomiTablNumericaPageRoutingModule } from './nomi-tabl-numerica-routing.module';

import { NomiTablNumericaPage } from './nomi-tabl-numerica.page';
import { componentsModule } from 'src/app/componentes/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NomiTablNumericaPageRoutingModule,
    componentsModule
  ],
  declarations: [NomiTablNumericaPage]
})
export class NomiTablNumericaPageModule {}
