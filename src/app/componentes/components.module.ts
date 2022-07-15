import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { EncaAtrasComponent } from "./enca-atras/enca-atras.component";
import { EncabezadoComponent } from "./encabezado/encabezado.component";
import { MenuComponent } from "./menu/menu.component";

@NgModule({
    declarations: [
        EncabezadoComponent,
        MenuComponent,
        EncaAtrasComponent
    ],
    exports: [
        EncabezadoComponent,
        MenuComponent,
        EncaAtrasComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class componentsModule { }