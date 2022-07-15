import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';
import { ModalNovedadPage } from '../../permNoveLAP/modal-novedad/modal-novedad.page';
import { ModalFaltoPage } from '../modal-falto/modal-falto.page';

@Component({
  selector: 'app-disponibles',
  templateUrl: './disponibles.page.html',
  styleUrls: ['./disponibles.page.scss'],
})
export class DisponiblesPage implements OnInit {
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');
  disponible: any = [];
  catalogoFF: any = [];
  codCat: string;
  buscador: string = '';

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private alerCtrl: AlertController,
    private modalCtrl: ModalController,
    private ruta: Router
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargarDisponibles();
    }
  }

  refrescarPantalla(event) {
    setTimeout(() => {
      this.cargarDisponibles();
      event.target.complete();
    }, 500);
  }

  async cargarDisponibles() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();
    this.partMoviServ.disponible().subscribe((respFila: any) => {
      this.disponible = respFila;
      loading.dismiss();
    });
  }

  //Opcion de registro
  capturaObjEnviar(event: any, nomCompleto) {
    this.codCat = event.detail.value;
    if (this.codCat === '48') {
      this.mostrarModal(ModalFaltoPage, nomCompleto);
    } else if (this.codCat === 'N') {
      /* let catalogoTNov;
      this.partMoviServ
        .catalogoTipNovedades('N')
        .subscribe((respCatTNov: any) => {
          catalogoTNov = respCatTNov;
        });

      this.mostrarModal(ModalNovedadPage, nomCompleto, catalogoTNov);
      */
      // Fuera de fila
      console.log('Viendo que captura ', this.codCat);
      sessionStorage.setItem('compAlert', this.codCat);
      this.utilServ.enviarObjPersona(nomCompleto);
      this.ruta.navigate(['/modal-novedad']);
    } else {
      // Fuera de fila
      console.log('Viendo que captura ', this.codCat);
      sessionStorage.setItem('compAlert', this.codCat);
      this.utilServ.enviarObjPersona(nomCompleto);
      this.ruta.navigate(['/crea-fuer-fila']);
    }
  }

  async mostrarModal(irModalPg, objPersona?) {
    const modal = await this.modalCtrl.create({
      component: irModalPg,
      componentProps: {
        objPersonaMdl: objPersona,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.cargarDisponibles();
  }

  //Buscando persona
  buscarPersonal(event) {
    this.buscador = event.detail.value;
  }
}
