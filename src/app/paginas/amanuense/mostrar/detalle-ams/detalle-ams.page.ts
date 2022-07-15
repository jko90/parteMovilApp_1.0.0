import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-detalle-ams',
  templateUrl: './detalle-ams.page.html',
  styleUrls: ['./detalle-ams.page.scss'],
})
export class DetalleAmsPage implements OnInit {
  persona;
  tituEncabezado: string = sessionStorage.getItem('siglaUnidad');

  constructor(private utilServ: UtilitariosService) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respPersona: any) => {
          this.persona = respPersona;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
