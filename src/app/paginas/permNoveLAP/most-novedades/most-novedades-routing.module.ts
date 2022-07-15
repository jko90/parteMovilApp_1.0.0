import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostNovedadesPage } from './most-novedades.page';

const routes: Routes = [
  {
    path: '',
    component: MostNovedadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostNovedadesPageRoutingModule {}
