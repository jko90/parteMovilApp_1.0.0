import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-edit-perm-lap',
  templateUrl: './edit-perm-lap.page.html',
  styleUrls: ['./edit-perm-lap.page.scss'],
})
export class EditPermLapPage implements OnInit {
  persona: any = [];
  newMotivo: string;
  newFecha;

  objForm = new FormGroup({
    lanFecFin: new FormControl(),
    memCedulaReg: new FormControl(),
    lanObserva: new FormControl(),
    memCedula: new FormControl(),
    lanFecIni: new FormControl(),
    clpCodigo: new FormControl(),
    lanTiposol: new FormControl(),
  });

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respPermLAP: any) => {
          this.persona = respPermLAP;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  cambioFecha(event) {
    let newFechaa = new Date(event.detail.value);
    this.newFecha =
      newFechaa.getFullYear() +
      '-' +
      (newFechaa.getMonth() + 1) +
      '-' +
      newFechaa.getDate() +
      ' ' +
      newFechaa.getHours() +
      ':' +
      newFechaa.getMinutes();

    if (this.newFecha > this.persona.fFin) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es mayor a la de presentacion',
        'Error'
      );
    } else if (this.newFecha < this.persona.fInicio) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es memor a la de salida',
        'Error'
      );
    }
  }

  suspender() {
    if (this.newFecha > this.persona.fFin) {
      this.utilServ.mostAlerta('Corrija la fecha de presentacion', 'Error');
    } else if (this.newFecha < this.persona.fInicio) {
      this.utilServ.mostAlerta('Corrija la fecha de presentacion', 'Error');
    } else if (this.newFecha === undefined) {
      this.utilServ.mostAlerta('Seleccione una fecha', 'Error');
    } else {
      this.actualizarPermLAP(
        this.newFecha,
        sessionStorage.getItem('ciUsuario'),
        this.persona.observacion,
        this.persona.cedula,
        this.persona.finicio,
        this.persona.cpl_codigo,
        this.persona.tipoplap
      );
    }
  }

  actualizarPermLAP(
    fechRegistro,
    usRegistra,
    observ,
    memCedula,
    fechInicio,
    clpCodigo,
    lanTipo
  ) {
    this.objForm.patchValue({
      lanFecFin: fechRegistro,
      memCedulaReg: usRegistra,
      lanObserva: observ,
      memCedula: memCedula,
      lanFecIni: fechInicio,
      clpCodigo: clpCodigo,
      lanTiposol: lanTipo,
    });

    this.partMoviServ.actualizarPermLAP(this.objForm.value).subscribe(
      (resultado: any) => {
        if (resultado === 0) {
          this.utilServ.mostAlerta('Error al finalizar Licencia', 'Error');
        } else {
          this.utilServ.mostAlerta('Actualizado correctamente', 'Información');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
