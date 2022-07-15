import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFaltoPage } from './modal-falto.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFaltoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFaltoPageRoutingModule {}
