import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-modal-novedad',
  templateUrl: './modal-novedad.page.html',
  styleUrls: ['./modal-novedad.page.scss'],
})
export class ModalNovedadPage implements OnInit {
  tituEncabezado: string = sessionStorage.getItem('siglaUnidad');
  persona;
  tipoNovedad: any = [];
  titCompar;
  newFechaIni;
  fechaIni;
  observacionn;
  clpCodigoo


  // new FormControl(),
  objFormNov = new FormGroup({
    clpCodigo: new FormControl(),
    lanTiposol: new FormControl(),
    memCedula: new FormControl(),
    novFecini: new FormControl(),
    novObservacion: new FormControl(),
    uniCodigo2: new FormControl(),
    memRegCedula: new FormControl(),
  });

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
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
      this.titCompar = 'REGISTRAR NOVEDAD';
      this.partMoviServ.catalogoTipNovedades('N').subscribe((respTNov: any) => {
        this.tipoNovedad = respTNov;
        console.log("Viendo que traede la base  ", respTNov)
      });
    }
  }

  fechaInicio(event) {
    this.newFechaIni = new Date(event.detail.value);
    let compFecha = new Date();
    compFecha.setMinutes(compFecha.getMinutes() + 10);
    if (this.newFechaIni > compFecha) {
      this.utilServ.mostAlerta( 'La fecha seleccionada es mayor a la fecha actual', 'Error' );
    } else {
      this.fechaIni = this.newFechaIni.getFullYear() + '-' + (this.newFechaIni.getMonth() + 1) + '-' +
        this.newFechaIni.getDate() + ' ' + this.newFechaIni.getHours() + ':' + this.newFechaIni.getMinutes();
    }
  }


  capturaTipoNovedad(event: any) {
    console.log("viendo que captura en tipo de novedad", event.detail.value)
    this.clpCodigoo = event.detail.value
  }

  registrarNovedad() {
    console.log('Viendo que captura ', );

    if(this.fechaIni === undefined){
      this.fechaIni = new Date(); 
    }
    if( this.observacionn === undefined){
      this.observacionn = 'Novedad'
    }

    this.objFormNov.patchValue({
      clpCodigo: this.clpCodigoo,
      lanTiposol: 'N',
      memCedula: this.persona.memCedula,
      novFecini: this.fechaIni,
      novObservacion: 'Registrado desde la App: ' + this.observacionn,
      uniCodigo2: sessionStorage.getItem('codUnidad'),
      memRegCedula: sessionStorage.getItem('ciUsuario'),
    });

    this.partMoviServ.insertarNovedad(this.objFormNov.value).subscribe(
      (resultado: any) => {
        this.respuestaRegistro(resultado);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  respuestaRegistro(resultado) {
    if (resultado === 1) {
      this.utilServ.mostAlerta('Registrado correctamente', 'Información');
    } else {
      this.utilServ.mostAlerta('Error al registrar ', 'Error');
    }
    this.ruta.navigate(['/disponibles']);
  }
}
