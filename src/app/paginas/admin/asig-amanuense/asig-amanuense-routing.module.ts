import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsigAmanuensePage } from './asig-amanuense.page';

const routes: Routes = [
  {
    path: '',
    component: AsigAmanuensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsigAmanuensePageRoutingModule {}
