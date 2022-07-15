import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/servicios/menu.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  componentes: Observable<Menu[]>;

  constructor(
    private menuServ: MenuService,
    private irPagina: NavController,
    private utilServ: UtilitariosService
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.componentes = this.cargarMenu();
    }
  }

  refrescarPantalla(event) {
    setTimeout(() => {
      this.componentes = this.cargarMenu();
      event.target.complete();
    }, 500);
  }

  limpiar() {
    this.utilServ.clear();
    this.irPagina.navigateForward('/login');
  }

  cargarMenu() {
    return this.menuServ.opcionMenu();
  }
}
