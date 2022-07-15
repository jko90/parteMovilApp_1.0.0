import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreaFuerFilaPage } from './crea-fuer-fila.page';

const routes: Routes = [
  {
    path: '',
    component: CreaFuerFilaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreaFuerFilaPageRoutingModule {}
