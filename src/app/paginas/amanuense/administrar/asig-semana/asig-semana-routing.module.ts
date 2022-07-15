import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsigSemanaPage } from './asig-semana.page';

const routes: Routes = [
  {
    path: '',
    component: AsigSemanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsigSemanaPageRoutingModule {}
