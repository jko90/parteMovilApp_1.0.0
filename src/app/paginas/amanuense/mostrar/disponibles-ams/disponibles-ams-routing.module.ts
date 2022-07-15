import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponiblesAmsPage } from './disponibles-ams.page';

const routes: Routes = [
  {
    path: '',
    component: DisponiblesAmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisponiblesAmsPageRoutingModule {}
