import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-fuera-fila',
  templateUrl: './fuera-fila.page.html',
  styleUrls: ['./fuera-fila.page.scss'],
})
export class FueraFilaPage implements OnInit {
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');
  fueraFila: any = [];

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    private alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargarFueraFila();
    }
  }

  refrescarPantalla(event) {
    setTimeout(() => {
      this.cargarFueraFila();
      event.target.complete();
    }, 500);
  }

  async cargarFueraFila() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();

    this.partMoviServ.efectivosFuFi().subscribe((respFuFi: any) => {
      this.fueraFila = respFuFi;
      loading.dismiss();
    });
  }

  informacionMovimiento(nomCompleto?) {
    this.utilServ.enviarObjPersona(nomCompleto);
    this.ruta.navigate(['/most-novedades']);
  }
}
