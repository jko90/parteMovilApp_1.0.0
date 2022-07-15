import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostPermLapPage } from './most-perm-lap.page';

const routes: Routes = [
  {
    path: '',
    component: MostPermLapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostPermLapPageRoutingModule {}
