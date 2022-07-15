import { NgModule } from '@angular/core';
import { FiltrarPipe } from './filtrar.pipe';



@NgModule({
  declarations: [
    FiltrarPipe
  ],
  exports: [
    FiltrarPipe
  ]
})
export class PipesModule { }
