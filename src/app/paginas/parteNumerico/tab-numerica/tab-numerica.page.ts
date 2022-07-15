import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-tab-numerica',
  templateUrl: './tab-numerica.page.html',
  styleUrls: ['./tab-numerica.page.scss'],
})
export class TabNumericaPage implements OnInit {
  siglaUnidad: string = sessionStorage.getItem('siglaUnidad');
  numPermLAP;
  numNovedad;
  numFueraFila;
  numFila;
  numNoOrganico;
  totalOficUnidad = 0;
  totalTropUnidad = 0;
  noOrganicoOfic = 0;
  noOrganicoTro = 0;
  totalOficOrganico = 0;
  totalTropOrganico = 0;
  nomTitulo;

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router,
    private alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.cargarNumericos();
    }
  }

  refrescarPantalla(event) {
    setTimeout(() => {
    this.cargarNumericos();
      event.target.complete();
    }, 500);
  }

  async cargarNumericos() {

    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();

    this.partMoviServ.numNovedades().subscribe((respNovedad: any) => {
      this.numNovedad = respNovedad;
    });

    this.partMoviServ.numFueraFila().subscribe((respFuFi: any) => {
      this.numFueraFila = respFuFi;
    });

    this.partMoviServ.numPermisoLAP().subscribe((respPermLAP: any) => {
      this.numPermLAP = respPermLAP;
    });

    this.partMoviServ.numEfectivosFila().subscribe((respFila: any) => {
      this.numFila = respFila;
    });

    this.partMoviServ.numEfectUnidad().subscribe((respNomina: any) => {
      this.totalOficOrganico = respNomina.numOficial;
      this.totalTropOrganico = respNomina.numTropa;
    });

    loading.dismiss();
  }

  visualizarObjeto(novEfectivo, bandera?) {
    this.utilServ.setVarSession('auxiliar', bandera);

    if (novEfectivo === 'Fila') {
      this.ruta.navigate(['/disponibles']);
    } /*else if (novEfectivo === 'fueraFila') {
      this.ruta.navigate(['/fuera-fila']);
    }*/ else {
      this.utilServ.enviarObjPersona(novEfectivo);
      if (bandera === 'permLap') {
        sessionStorage.setItem('fecha', 'Fecha S.');
      } else {
        sessionStorage.setItem('fecha', 'Fecha I.');
      }
      this.ruta.navigate(['/nomi-tabl-numerica']);
    }
  }
}
