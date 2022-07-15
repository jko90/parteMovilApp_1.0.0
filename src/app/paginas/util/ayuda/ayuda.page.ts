import { Component, OnInit } from '@angular/core';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  siglaUnidad: string;

  constructor(private utilServ: UtilitariosService) { }

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.siglaUnidad = sessionStorage.getItem('siglaUnidad');

    }
  }

}
