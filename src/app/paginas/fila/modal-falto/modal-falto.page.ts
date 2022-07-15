import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-modal-falto',
  templateUrl: './modal-falto.page.html',
  styleUrls: ['./modal-falto.page.scss'],
})
export class ModalFaltoPage implements OnInit {
  @Input() objPersonaMdl;
  tituEncabezado: string = sessionStorage.getItem('siglaUnidad');
  fechaIni;
  fechaFin;
  newFechaIni;
  observacionn;

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
    private utilServ: UtilitariosService,
    private alerCtrl: AlertController,
    private partMoviServ: ParteMovilRestService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
    }
  }




  fechaInicio(event) {
    this.newFechaIni = new Date(event.detail.value);
    let compFecha = new Date(); 
    compFecha.setMinutes(compFecha.getMinutes() + 10);
    if (this.newFechaIni > compFecha) {
      this.utilServ.mostAlerta(
        'La fecha seleccionada es mayor a la fecha actual', 'Error' );
    } else {
      this.fechaIni =
        this.newFechaIni.getFullYear() + '-' + (this.newFechaIni.getMonth() + 1) + '-' + 
        this.newFechaIni.getDate() + ' ' + this.newFechaIni.getHours() + ':' + this.newFechaIni.getMinutes();
    }
    
  }

  async registrarFalto() {
    if(this.fechaIni === undefined){
      this.fechaIni = new Date(); 
    }
    if( this.observacionn === undefined){
      this.observacionn = 'FALTO'
    }
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: 'Está seguro de registrar como falto?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'ACEPTAR',
          id: 'confirm-button',
          handler: () => {

            this.objFormNov.patchValue({
              clpCodigo: '48',
              lanTiposol: 'N',
              memCedula: this.objPersonaMdl.memCedula,
              novFecini: this.fechaIni,
              novObservacion: 'Registrado desde la App: '+this.observacionn,
              uniCodigo2: sessionStorage.getItem('codUnidad'),
              memRegCedula: sessionStorage.getItem('ciUsuario'),
            });

            this.partMoviServ.insertarNovedad(this.objFormNov.value).subscribe(
              (resultado: any) => {
                if (resultado === 0) {
                  this.utilServ.mostAlerta('Error al registrar falto', 'Error');
                } else {
                  this.utilServ.mostAlerta(
                    'Registrado correctamente',
                    'Información'
                  );
                  this.modalCtrl.dismiss();
                }
              },
              (error) => {
                console.log(error);
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

}
