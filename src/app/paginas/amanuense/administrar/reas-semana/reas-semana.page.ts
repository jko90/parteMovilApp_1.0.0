import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-reas-semana',
  templateUrl: './reas-semana.page.html',
  styleUrls: ['./reas-semana.page.scss'],
})
export class ReasSemanaPage implements OnInit {
  persona;
  titCompar;
  compValidar;
  newFechaIni;
  newFechaFin;
  fechaFina;

  objPers = new FormGroup({
    perfUsuario: new FormControl(),
    uniCodigo: new FormControl(),
    memCedula: new FormControl(),
    memCedulaReg: new FormControl(),
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
          this.newFechaIni = new Date(this.persona.fInicio);
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

  fechaFin(event) {

    this.newFechaFin = new Date(event.detail.value);
    let compFecha = new Date();
    compFecha.setMinutes(compFecha.getMinutes() + 5);
    //let diaNumber = this.newFechaFin - this.newFechaIni;

    let numberValue = (this.newFechaFin - this.newFechaIni) / 1000 / 60 / 60 / 24;


    if (this.newFechaFin === undefined) {
      this.utilServ.mostAlerta('Seleccione la fecha fin', 'Error');
    } else if (this.newFechaFin <= compFecha) {
      this.utilServ.mostAlerta(
        'La fecha fin no puede ser menor a la fecha actual',
        'Error'
      );
    } else if (numberValue < 14) {
      this.utilServ.mostAlerta(
        'La semana no puede ser menor a 14 días',
        'Error'
      );
    } else if (numberValue > 15.5) {
      this.utilServ.mostAlerta(
        'La semana no puede ser mayor a 15 días',
        'Error'
      );
    } else {
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
      perfUsuario: objPersona.numePerfil,
      uniCodigo: sessionStorage.getItem('codUnidad'),
      memCedula: objPersona.memCedula,
      memCedulaReg: sessionStorage.getItem('ciUsuario'),
      perFechaFin: this.fechaFina,
    });

    if (this.newFechaIni === undefined) {
      this.utilServ.mostAlerta(
        'Primeramente seleccione la fecha de inicio',
        'Error'
      );
    } else {
      this.partMoviServ
        .actualizarSemana(this.objPers.value)
        .subscribe((respSemana: any) => {
          this.respuestaRegistro(respSemana);
        });
    }
  }

  respuestaRegistro(resultado) {
    if (resultado === 1) {
      this.utilServ.mostAlerta(
        'Semana registrado correctamente',
        'Información'
      );
    } else {
      this.utilServ.mostAlerta('Error al repetir semana', 'Error');
    }

    this.ruta.navigate(['/semana']);
  }
}
