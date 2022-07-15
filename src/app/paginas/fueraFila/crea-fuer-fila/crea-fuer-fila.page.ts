import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-crea-fuer-fila',
  templateUrl: './crea-fuer-fila.page.html',
  styleUrls: ['./crea-fuer-fila.page.scss'],
})
export class CreaFuerFilaPage implements OnInit {
  persona;
  catalogoFF: any = [];
  catalogoUnidad: any = [];
  catalogoTNov: any = [];
  codCat: any = [];
  unidadSelec;
  clpcodigo;
  fechaIni;
  fechaFina;
  fechaPresenta;
  observacionn;
  newFechaIni;
  newFechaFin;
  compValidar;
  titCompar;
  titComparCat = null;
  uniCompare = null;
  bandFechaPresenta = null;
  tNovedad;

  objFormFF = new FormGroup({
    memCedula: new FormControl(),
    pfuFechaIni: new FormControl(),
    pfuFechaFin: new FormControl(),
    pfuObservacion: new FormControl(),
    ptfCodigo: new FormControl(),
    uniCodigo2: new FormControl(),
    regCedula: new FormControl(),
  });

  // new FormControl(),
  objFormNov = new FormGroup({
    clpCodigo: new FormControl(),
    lanTiposol: new FormControl(),
    memCedula: new FormControl(),
    novFecini: new FormControl(),
    novFecfin: new FormControl(),
    novFecpre: new FormControl(),
    novObservacion: new FormControl(),
    novUnidad: new FormControl(),
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

      this.compValidar = sessionStorage.getItem('compAlert');
      if (this.compValidar === 'fueraFila') {
        this.titCompar = 'Fuera de Fila';
        this.partMoviServ.catalogoFuFi().subscribe((respCatFF: any) => {
          this.catalogoFF = respCatFF;
        });
      } else if (this.compValidar === 'novedad') {
        this.titCompar = 'Tipo de novedad';
        this.partMoviServ.catalogoNovedades().subscribe((respCatNov: any) => {
          this.catalogoFF = respCatNov;
        });
      } else {
        this.titCompar = 'Permiso/Licencia';
      }
    }
  }

  fechaInicio(event) {
    this.newFechaIni = new Date(event.detail.value);
    let compFecha = new Date();
    compFecha.setMinutes(compFecha.getMinutes() + 5);

    if (this.newFechaIni > compFecha) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es mayor a la fecha actual',
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

  regFechaPresenta(event) {
    this.newFechaFin = new Date(event.detail.value);
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
    } else {
      this.fechaPresenta =
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

  registrarFuFi(objPersona) {
    if (this.newFechaIni === undefined) {
      this.fechaIni = new Date();
       this.utilServ.mostAlerta('Información registrada con fecha actual', 'información' );
    }
    this.objFormFF.patchValue({
      memCedula: objPersona.memCedula,
      pfuFechaIni: this.fechaIni,
      pfuFechaFin: this.fechaFina,
      pfuObservacion: this.observacionn,
      ptfCodigo: this.codCat.id,
      uniCodigo2: sessionStorage.getItem('codUnidad'),
      regCedula: sessionStorage.getItem('ciUsuario'),
    });

    this.partMoviServ.insertarFueraFila(this.objFormFF.value).subscribe(
      (resultado: any) => {
        this.respuestaRegistro(resultado, 'Fuera de fila');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  capturaFueraFila(event: any) {
    this.codCat = event.detail.value;
    console.log("Viendo que hace ",event.detail.value)
      this.titComparCat = null;
      this.tNovedad = this.codCat.id;

  }

  respuestaRegistro(resultado, msm) {
    if (resultado === 1) {
      this.utilServ.mostAlerta('Registrado correctamente', 'Información');
    } else  {
      this.utilServ.mostAlerta('Error al registrar Fuera de Fila', 'Error');
    } 
    this.ruta.navigate(['/disponibles']);
  }
}
