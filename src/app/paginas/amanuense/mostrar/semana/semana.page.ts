import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-semana',
  templateUrl: './semana.page.html',
  styleUrls: ['./semana.page.scss'],
})
export class SemanaPage implements OnInit {
  semanaClasOfic = [];
  siglaUnidad: string;
  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    private alerCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargandoDatos();
      this.siglaUnidad = sessionStorage.getItem('siglaUnidad');
    }
  }

  async cargandoDatos() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();

    this.partMoviServ.semanaOficClasActual().subscribe((respSemana: any) => {
      loading.dismiss();
      this.semanaClasOfic = respSemana;
    },
    (error) => {
      loading.dismiss();
      console.log(error);
    }
    );
  }

  async mostrarModal(objPersona?) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: {
        objPersonaMdl: objPersona,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.cargandoDatos();
    this.alertaConfirmar(data.objPersona);

  }

  async alertaConfirmar(objPersona) {
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: 'Está seguro de reasignar semana?',
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
            this.utilServ.enviarObjPersona(objPersona);
            this.ruta.navigate(['/reas-semana']);
          },
        },
      ],
    });
    await alert.present();
  }
}
