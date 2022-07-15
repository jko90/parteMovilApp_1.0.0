import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  persona;
  tituEncabezado: string = 'Detalle';

  constructor(private utilServ: UtilitariosService) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respNovedad: any) => {
          this.persona = respNovedad;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
