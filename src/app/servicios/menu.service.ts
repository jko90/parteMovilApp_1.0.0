import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private htp: HttpClient) {}

  opcionMenu() {
    if (sessionStorage.getItem('perfUsuario') === '971') {//con 970 correcto, super administrador
      return this.htp.get<Menu[]>('/assets/datos/menu-admin.json');
    } else if (sessionStorage.getItem('perfUsuario') === '971') { // con 971 correcto amanuence de unidad
      return this.htp.get<Menu[]>('/assets/datos/menu-ams.json');
    }else if (sessionStorage.getItem('perfUsuario') === '972') { //con 972 oficial de semana
      return this.htp.get<Menu[]>('/assets/datos/menu-os.json');
    } else {
      return this.htp.get<Menu[]>('/assets/datos/menu.json'); // con 973 clase de semana
    }
  }
  
}
