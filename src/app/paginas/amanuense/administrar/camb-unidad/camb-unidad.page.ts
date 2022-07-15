import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-camb-unidad',
  templateUrl: './camb-unidad.page.html',
  styleUrls: ['./camb-unidad.page.scss'],
})
export class CambUnidadPage implements OnInit {
  listUnidades: any = [];
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');

  constructor(
    private partMoviServ: ParteMovilRestService,
    private alerCtrl: AlertController,
    private irPagina: NavController,
    private utilServ: UtilitariosService
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.mostrarUnidades();
    }
  }

  async mostrarUnidades() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });

    loading.present();
    this.partMoviServ.seleccionUnidades().subscribe(
      (respUnidad: any) => {
        loading.dismiss();
        this.listUnidades = respUnidad;
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      }
    );
  }

  seleccionarUnidades(codUnidad, siglaUnidad) {
    this.alertaConfirmar(codUnidad, siglaUnidad);
  }

  async alertaConfirmar(codUnidad, siglaUnidad) {
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar',
      message: 'Está seguro de cambiar de unidad?',
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
            sessionStorage.setItem('codUnidad', codUnidad);
            sessionStorage.setItem('siglaUnidad', siglaUnidad);
            this.irPagina.navigateForward('/inicio');
          },
        },
      ],
    });
    await alert.present();
  }
}
