import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabDetalladaPage } from './tab-detallada.page';

const routes: Routes = [
  {
    path: '',
    component: TabDetalladaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabDetalladaPageRoutingModule {}
