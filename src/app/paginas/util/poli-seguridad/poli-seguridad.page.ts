import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-poli-seguridad',
  templateUrl: './poli-seguridad.page.html',
  styleUrls: ['./poli-seguridad.page.scss'],
})
export class PoliSeguridadPage implements OnInit {

  siglaUnidad: string;

  constructor(private utilServ: UtilitariosService) { }

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.siglaUnidad = sessionStorage.getItem('siglaUnidad');

    }
  }

}
