import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAmsPage } from './detalle-ams.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAmsPageRoutingModule {}
