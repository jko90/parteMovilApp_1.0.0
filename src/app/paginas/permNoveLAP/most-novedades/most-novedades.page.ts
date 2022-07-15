import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-most-novedades',
  templateUrl: './most-novedades.page.html',
  styleUrls: ['./most-novedades.page.scss'],
})
export class MostNovedadesPage implements OnInit {
  persona;
  titCompar;

  constructor(private utilServ: UtilitariosService, private ruta: Router) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respNovedad: any) => {
          this.persona = respNovedad;
          this.titCompar = respNovedad.motivo;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  finalizarNovedad() {
    this.ruta.navigate(['/edit-novedad']);
  }
}
