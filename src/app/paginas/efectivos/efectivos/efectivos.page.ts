import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-efectivos',
  templateUrl: './efectivos.page.html',
  styleUrls: ['./efectivos.page.scss'],
})
export class EfectivosPage implements OnInit {
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');
  efectivos = [];
  efectivosNoOrganicos = [];
  buscador: string = '';

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    private alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargarEfectivos();
    }
  }
  async cargarEfectivos() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();
    this.partMoviServ.efectivosUnidad().subscribe((respEfectivo: any) => {
      this.efectivos = respEfectivo;
    });

    this.partMoviServ.efectivosUnidadNoOrganicos().subscribe((respEfectivo: any) => {
      this.efectivosNoOrganicos = respEfectivo;
    });
    loading.dismiss();

  }

  montrarDetalle(nomCompleto?) {
    this.utilServ.enviarObjPersona(nomCompleto);
    this.ruta.navigate(['/detalle']);
  }

  buscarPersonal(event) {
    this.buscador = event.detail.value;
  }
}
