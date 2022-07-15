import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-selec-unidad',
  templateUrl: './selec-unidad.page.html',
  styleUrls: ['./selec-unidad.page.scss'],
})
export class SelecUnidadPage implements OnInit {

  

  constructor(
    private alerCtrl: AlertController,
    private partMoviServ: ParteMovilRestService,
    private irPagina: NavController,
    private utilServ: UtilitariosService
  ) {}

  titulo: string;
  listUnidades: any = [];

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.mostrarTitulo(sessionStorage.getItem('971')!);
      this.mostrarUnidades();
    }
  }

  mostrarTitulo(perfil) {
    if (perfil === '971') {
      this.titulo = 'AMANUENSE DE PERSONAL';
    } else if (perfil === '972') {
      this.titulo = 'OFICIAL DE SEMANA';
    } else if (perfil === '973') {
      this.titulo = 'CLASE DE SEMANA';
    }else{
      this.titulo = 'NINGUNO';
    }
  }

  seleccionarUnidades(codUnidad, siglaUnidad) {
    sessionStorage.setItem('codUnidad', codUnidad);
    sessionStorage.setItem('siglaUnidad', siglaUnidad);
    this.irPagina.navigateForward('/inicio');
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

  limpiar() {
    this.utilServ.clear();
    this.irPagina.navigateForward('/login');
  }
/*
  async mostAlerta(mensaje) {
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
  */
}
