import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-tab-detallada',
  templateUrl: './tab-detallada.page.html',
  styleUrls: ['./tab-detallada.page.scss'],
})
export class TabDetalladaPage implements OnInit {
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');

  listPermisoLAP: any = [];
  listNovedades: any = [];
  fueraFila: any = [];

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    public alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargarDetalle();
    }
  }

  refrescarPantalla(event) {
    setTimeout(() => {
      this.cargarDetalle();
      event.target.complete();
    }, 500);
  }

  async cargarDetalle() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();

    // 

    this.partMoviServ.permisosLAP().subscribe((respNovedad: any) => {
      this.listPermisoLAP = respNovedad;
    });

    this.partMoviServ.novedades().subscribe((respNovedad: any) => {
      this.listNovedades = respNovedad;
    });
    this.partMoviServ.efectivosFuFi().subscribe((respFuFi: any) => {
      this.fueraFila = respFuFi;
    });

    loading.dismiss();
  }

  informacionLAP(nomCompleto?) {
    this.utilServ.enviarObjPersona(nomCompleto);
    this.ruta.navigate(['/most-perm-lap']);
  }

  informacionMovimiento(nomCompleto?, bandera?) {
    this.utilServ.setVarSession('auxiliar', bandera);
    this.utilServ.enviarObjPersona(nomCompleto);
    this.ruta.navigate(['/most-novedades']);
  }
}
