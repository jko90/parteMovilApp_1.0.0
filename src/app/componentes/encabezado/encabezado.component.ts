import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
})
export class EncabezadoComponent {
  @Input() titulo: string = '';

  menuId: string = '';

  constructor(
    private irPagina: NavController,
    private utilServ: UtilitariosService
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
    }
  }

  async salir() {
    this.utilServ.clear();
    this.irPagina.navigateForward('/login');
  }
}
