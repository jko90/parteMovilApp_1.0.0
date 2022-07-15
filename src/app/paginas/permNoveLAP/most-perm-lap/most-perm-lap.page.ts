import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-most-perm-lap',
  templateUrl: './most-perm-lap.page.html',
  styleUrls: ['./most-perm-lap.page.scss'],
})
export class MostPermLapPage implements OnInit {
  persona: any = [];

  constructor(
    private utilServ: UtilitariosService, 
    private ruta: Router,
    public alerCtrl: AlertController
    ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.mostrarPermisoLAP();
    }
  }

  async mostrarPermisoLAP() {
    const loading = await this.alerCtrl.create({
      message: 'Cargando...',
    });

    loading.present();

    this.utilServ.$getObjPersona.subscribe(
      (respPermLAP: any) => {
        this.persona = respPermLAP;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  suspender(objPersona) {
    this.ruta.navigate(['/edit-perm-lap']);
  }
}
