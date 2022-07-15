import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { componentsModule } from './componentes/components.module';
import { EncaAtrasComponent } from './componentes/enca-atras/enca-atras.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FiltrarPipe } from './pipes/filtrar.pipe';

@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent,
    EncaAtrasComponent,
    EncabezadoComponent,
    FiltrarPipe

  ],
  entryComponents: [],
  exports: [
    MenuComponent,
    EncaAtrasComponent,
    EncabezadoComponent,
    FiltrarPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
