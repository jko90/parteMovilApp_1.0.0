import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-nomi-tabl-numerica',
  templateUrl: './nomi-tabl-numerica.page.html',
  styleUrls: ['./nomi-tabl-numerica.page.scss'],
})
export class NomiTablNumericaPage implements OnInit {
  fecha: string = sessionStorage.getItem('fecha');
  fueraFila: any = [];
  permLapNovedades = [];
  titulo;
  tipoActividad;
  redireccion;
  tipoNovedad;

  constructor(
    private utilServ: UtilitariosService,
    private conServicio: ParteMovilRestService,
    private ruta: Router,
    private irPagina: NavController,
    private alerCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      
      this.redireccion = sessionStorage.getItem('auxiliar');
      this.utilServ.$getObjPersona.subscribe((respValidador) => {
        this.tipoNovedad = respValidador;
        this.titulo = respValidador;
      });
      this.consultaParametizadas(this.redireccion, this.tipoNovedad);
    }
  }


  refrescarPantalla(event) {
    setTimeout(() => {
      this.consultaParametizadas(this.redireccion, this.tipoNovedad);
      event.target.complete();
    }, 500);
  }

  async consultaParametizadas(redireccion, respValidador) {
    const loading = await this.alerCtrl.create({
      message: 'Cargando información...',
    });
    loading.present();
    if (redireccion === 'fuerfila') {
      this.tipoActividad = "Fuera de fila";
      this.conServicio.efectivosFuFi().subscribe((respFuFi: any) => {
        this.fueraFila = respFuFi;
      });
    } else if (redireccion === 'novedad') {
      if (respValidador === 'Otras novedades') {
        this.tipoActividad = "Otras novedades";
        this.conServicio .detalleOtrasNovedades() .subscribe((respXTipoNovedad: any) => {
            this.permLapNovedades = respXTipoNovedad;
          });
      } else {
        this.tipoActividad = "Novedades";

        this.conServicio.detallePorTipoNovedad(respValidador) .subscribe((respXTipoNovedad: any) => {
            this.permLapNovedades = respXTipoNovedad;
          });
      }
    } else {
      this.tipoActividad = "Licencia / Permisos";

      var permOLap;
      redireccion === 'Permiso' ? (permOLap = 'P') : (permOLap = 'L');

      this.conServicio.permisoOLAP(permOLap).subscribe((respPermLAP: any) => {
        this.permLapNovedades = respPermLAP;
      });
    }
    loading.dismiss();
  }

  async salir() {
    this.utilServ.clear();
    this.irPagina.navigateForward('/login');
  }

  informacionMovimiento(nomCompleto?, bandera?) {
    this.utilServ.enviarObjPersona(nomCompleto);
    if (this.fecha === 'Fecha S.') {
      this.ruta.navigate(['/most-lap']);
    } else if (this.fecha === 'Fecha I.') {
      this.ruta.navigate(['/most-novedades']);
    }
  }
}
