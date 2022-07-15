import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/servicios/menu.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  componentes: Observable<Menu[]>;

  constructor(
    private servMenu: MenuService
  ) {}

  ngOnInit() {
      this.componentes = this.servMenu.opcionMenu();
  }

  refrescarPantalla(event) {
    setTimeout(() => {
      this.componentes = this.servMenu.opcionMenu();
      event.target.complete();
    }, 500);
  }
}
