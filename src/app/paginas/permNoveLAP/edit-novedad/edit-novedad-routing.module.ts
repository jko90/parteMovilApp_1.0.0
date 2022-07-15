import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNovedadPage } from './edit-novedad.page';

const routes: Routes = [
  {
    path: '',
    component: EditNovedadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNovedadPageRoutingModule {}
