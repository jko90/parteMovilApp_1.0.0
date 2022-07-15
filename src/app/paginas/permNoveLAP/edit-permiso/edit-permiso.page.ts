import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-edit-permiso',
  templateUrl: './edit-permiso.page.html',
  styleUrls: ['./edit-permiso.page.scss'],
})
export class EditPermisoPage implements OnInit {
  persona: any = [];
  newMotivo: string;
  newFecha;

  constructor(private utilServ: UtilitariosService, private ruta: Router) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respPermLAP: any) => {
          this.persona = respPermLAP.observacion;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  suspender(observacion) {
    if (this.newFecha > this.persona.fFin) {
      this.utilServ.mostAlerta('Corrija la fecha de presentacion', 'Error');
    } else if (this.newFecha < this.persona.fInicio) {
      this.utilServ.mostAlerta('Corrija la fecha de presentacion', 'Error');
    } else {
      let es = this.newMotivo + ' (' + observacion + ')';
      if (this.newMotivo === undefined) {
        this.utilServ.mostAlerta('Ingrese motivo de suspención', 'Error');
      } else {
        this.ruta.navigate(['/tab-detallada']);
      }
    }
  }

  cambioFecha(event) {
    this.newFecha = new Date(event.detail.value).getTime();
    if (this.newFecha > this.persona.fFin) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es mayor a la de presentacion',
        'Error'
      );
    } else if (this.newFecha < this.persona.fInicio) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es memor a la de presentacion',
        'Error'
      );
    }
  }
}
