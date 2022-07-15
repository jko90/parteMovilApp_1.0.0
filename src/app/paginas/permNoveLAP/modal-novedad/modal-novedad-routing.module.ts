import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalNovedadPage } from './modal-novedad.page';

const routes: Routes = [
  {
    path: '',
    component: ModalNovedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalNovedadPageRoutingModule {}
