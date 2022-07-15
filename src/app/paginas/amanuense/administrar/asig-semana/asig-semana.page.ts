import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-asig-semana',
  templateUrl: './asig-semana.page.html',
  styleUrls: ['./asig-semana.page.scss'],
})
export class AsigSemanaPage implements OnInit {
  persona;
  titCompar;
  compValidar;
  newFechaIni;
  newFechaFin;
  fechaIni;
  fechaFina;

  objPers = new FormGroup({
    perfUsuario: new FormControl(),
    codUnidad: new FormControl(),
    memCedula: new FormControl(),
    memCedulaReg: new FormControl(),
    perFechaini: new FormControl(),
    perFechaFin: new FormControl(),
  });

  constructor(
    private utilServ: UtilitariosService,
    private partMoviServ: ParteMovilRestService,
    private ruta: Router
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respPers: any) => {
          this.persona = respPers;
        },
        (error) => {
          console.log(error);
        }
      );

      this.compValidar = sessionStorage.getItem('perfAsigna');
      if (this.compValidar === '993') {
        this.titCompar = 'Clase de semana';
      } else if (this.compValidar === '992') {
        this.titCompar = 'Oficial de semana';
      } else {
        this.titCompar = 'Reasignar semana';
      }
    }
  }

  fechaInicio(event) {
    this.newFechaIni = new Date(event.detail.value);
    let compFecha = new Date(); //fecha.setHours(fecha.getHours()+1);
    compFecha.setMinutes(compFecha.getMinutes() + 5);

    if (this.newFechaIni < compFecha) {
      this.utilServ.mostAlerta(
        'No se puede registrar con fechas anteriores',
        'Error'
      );
    } else if (this.newFechaIni.getDay() > 5) {
      this.utilServ.mostAlerta(
        'El registro de semana está autorizado de Miercoles a Viernes',
        'Error'
      );
    } else {
      this.fechaIni =
        this.newFechaIni.getFullYear() +
        '-' +
        (this.newFechaIni.getMonth() + 1) +
        '-' +
        this.newFechaIni.getDate() +
        ' ' +
        this.newFechaIni.getHours() +
        ':' +
        this.newFechaIni.getMinutes();
    }
  }

  fechaFin(event) {
    this.newFechaFin = new Date(event.detail.value);
    let diaNumber = this.newFechaFin.getDate() - this.newFechaIni.getDate();

    if (this.newFechaIni === undefined) {
      this.utilServ.mostAlerta(
        'Primeramente seleccione la fecha de inicio',
        'Error'
      );
    } else if (this.newFechaFin <= this.newFechaIni) {
      this.utilServ.mostAlerta(
        'La fecha fin no puede ser menor a la fecha de inicio',
        'Error'
      );
    } /*else if (diaNumber < 6) {
      this.utilServ.mostAlerta(
        'La semana no puede ser menor a 7 días',
        'Error'
      );
    } else if (diaNumber > 8) {
      this.utilServ.mostAlerta(
        'La semana no puede ser mayor a 7 días',
        'Error'
      );
    }*/ else {
      this.fechaFina =
        this.newFechaFin.getFullYear() +
        '-' +
        (this.newFechaFin.getMonth() + 1) +
        '-' +
        this.newFechaFin.getDate() +
        ' ' +
        this.newFechaFin.getHours() +
        ':' +
        this.newFechaFin.getMinutes();
    }
  }

  registrarSemana(objPersona) {
    
    this.objPers.patchValue({
      perfUsuario: sessionStorage.getItem('perfAsigna'),
      codUnidad: sessionStorage.getItem('codUnidad'),
      memCedula: objPersona.memCedula,
      memCedulaReg: sessionStorage.getItem('ciUsuario'),
      perFechaini: this.fechaIni,
      perFechaFin: this.fechaFina,
    });

    if (this.newFechaIni === undefined) {
      this.utilServ.mostAlerta(
        'Primeramente seleccione la fecha de inicio',
        'Error'
      );
    } else {
      this.partMoviServ
        .asignarSemana(this.objPers.value)
        .subscribe((respSemana: any) => {
          this.respuestaRegistro(respSemana);
        });
    }
  }

  respuestaRegistro(resultado) {
    if (resultado === 0) {
      this.utilServ.mostAlerta('Error al registrar semana', 'Error');
    } else if (resultado === 1) {
      this.utilServ.mostAlerta(
        'La unidad dispone de un Clase de Semana activa, no se puede ingresar ningun registro, hasta que finalice la misma',
        'Error'
      );
    } else if (resultado === 2) {
      this.utilServ.mostAlerta(
        'La unidad dispone de un Oficial de Semana activa, no se puede ingresar ningun registro, hasta que finalice la misma',
        'Error'
      );
    } else if (resultado === 3) {
      this.utilServ.mostAlerta('Registrado correctamente', 'Información');
    }

    this.ruta.navigate(['/semana']);
  }
}
