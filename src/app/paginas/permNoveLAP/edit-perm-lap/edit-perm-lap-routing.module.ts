import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPermLapPage } from './edit-perm-lap.page';

const routes: Routes = [
  {
    path: '',
    component: EditPermLapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPermLapPageRoutingModule {}
