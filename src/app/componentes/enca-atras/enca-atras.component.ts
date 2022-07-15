import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-enca-atras',
  templateUrl: './enca-atras.component.html',
  styleUrls: ['./enca-atras.component.scss'],
})
export class EncaAtrasComponent implements OnInit {
  @Input() titulo: string = '';

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
