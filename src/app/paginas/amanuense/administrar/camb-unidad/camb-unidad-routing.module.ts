import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambUnidadPage } from './camb-unidad.page';

const routes: Routes = [
  {
    path: '',
    component: CambUnidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambUnidadPageRoutingModule {}
