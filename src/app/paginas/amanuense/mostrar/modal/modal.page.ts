import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() objPersonaMdl;
  tituEncabezado: string = sessionStorage.getItem('siglaUnidad');
  fechaIni;
  fechaFin;

  objForm = new FormGroup({
    memCedula: new FormControl(),
    codPerfil: new FormControl(),
    codUnidad: new FormControl(),
  });

  constructor(
    private modalCtrl: ModalController,
    private utilServ: UtilitariosService,
    private alerCtrl: AlertController,
    private partMoviServ: ParteMovilRestService
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      let fechIni = new Date(parseInt(this.objPersonaMdl.fInicio));
      this.fechaIni = fechIni.toLocaleString();

      let fechfin = new Date(parseInt(this.objPersonaMdl.fFin));
      this.fechaFin = fechfin.toLocaleString();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  repetirSemana() {
    this.modalCtrl.dismiss({
      objPersona: this.objPersonaMdl,
    });
  }

  async finalizarSemana() {
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: 'Está seguro de finalizar semana?',
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

            this.objForm.patchValue({
              memCedula: this.objPersonaMdl.memCedula,
              codPerfil: this.objPersonaMdl.numePerfil,
              codUnidad: sessionStorage.getItem('codUnidad'),

            });

            this.partMoviServ.finalizarSemana(this.objForm.value).subscribe(
              (resultado: any) => {
                if (resultado === 0) {
                  this.utilServ.mostAlerta('Error al finalizar semana', 'Error');
                } else {
                  this.utilServ.mostAlerta(
                    'Semana finalizado correctamente',
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
