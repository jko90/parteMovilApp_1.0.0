import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPermisoPage } from './edit-permiso.page';

const routes: Routes = [
  {
    path: '',
    component: EditPermisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPermisoPageRoutingModule {}
