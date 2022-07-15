import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-disponibles-ams',
  templateUrl: './disponibles-ams.page.html',
  styleUrls: ['./disponibles-ams.page.scss'],
})
export class DisponiblesAmsPage implements OnInit {
  siglaUnidad: string;
  efectivos = [];
  buscador: string = '';

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    private alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.siglaUnidad = sessionStorage.getItem('siglaUnidad');
      this.cargandoDatos();
    }
  }

  //Buscando persona
  buscarPersonal(event) {
    this.buscador = event.detail.value;
  }

  //Opcion de registro
  capturaObjEnviar(event: any, objPersona) {
    sessionStorage.setItem('perfAsigna', event.detail.value);

    this.utilServ.enviarObjPersona(objPersona);
    this.ruta.navigate(['/asig-semana']);
  }

  uno: number;
  async cargandoDatos() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();

    this.partMoviServ.efectivosSemana().subscribe(
      (respEfectivo: any) => {
        loading.dismiss();
        this.efectivos = respEfectivo;
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      }
    );
  }
}
