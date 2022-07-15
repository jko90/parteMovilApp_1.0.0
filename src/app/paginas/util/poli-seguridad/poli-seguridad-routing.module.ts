import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliSeguridadPage } from './poli-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: PoliSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliSeguridadPageRoutingModule {}
