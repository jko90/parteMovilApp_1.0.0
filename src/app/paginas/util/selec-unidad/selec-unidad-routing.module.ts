import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecUnidadPage } from './selec-unidad.page';

const routes: Routes = [
  {
    path: '',
    component: SelecUnidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecUnidadPageRoutingModule {}
