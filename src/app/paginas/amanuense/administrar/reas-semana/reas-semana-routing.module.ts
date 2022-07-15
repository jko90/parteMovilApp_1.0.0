import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReasSemanaPage } from './reas-semana.page';

const routes: Routes = [
  {
    path: '',
    component: ReasSemanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasSemanaPageRoutingModule {}
