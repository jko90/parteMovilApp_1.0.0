import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  catalogoUnidades: any = [];
  buscador: string = '';

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.partMoviServ.catalogoUnidades().subscribe((respCatUni: any) => {
        this.catalogoUnidades = respCatUni;
      });
    }
  }

  capturaUnidad(event: any) {
    this.buscador = event.detail.value;
  }

  unidadSeleccionada(uniSelec?) {
    this.utilServ.enviarObjPersona(uniSelec);
    this.ruta.navigate(['/cre-fuera-fila']);
  }
}
