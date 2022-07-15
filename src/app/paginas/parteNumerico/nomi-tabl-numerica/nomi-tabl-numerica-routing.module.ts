import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NomiTablNumericaPage } from './nomi-tabl-numerica.page';

const routes: Routes = [
  {
    path: '',
    component: NomiTablNumericaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NomiTablNumericaPageRoutingModule {}
