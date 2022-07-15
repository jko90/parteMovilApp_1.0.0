import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabNumericaPage } from './tab-numerica.page';

const routes: Routes = [
  {
    path: '',
    component: TabNumericaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabNumericaPageRoutingModule {}
