import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FueraFilaPage } from './fuera-fila.page';

const routes: Routes = [
  {
    path: '',
    component: FueraFilaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FueraFilaPageRoutingModule {}
