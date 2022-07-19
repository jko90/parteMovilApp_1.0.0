import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloqueoPage } from './bloqueo.page';

const routes: Routes = [
  {
    path: '',
    component: BloqueoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloqueoPageRoutingModule {}
