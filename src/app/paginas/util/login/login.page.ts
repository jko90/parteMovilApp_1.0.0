import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ciUsuario: string;

  objFormLog = new FormGroup({
    usuario: new FormControl(),
  });

  constructor(
    private partMovilServ: ParteMovilRestService,
    private alerCtrl: AlertController,
    private irPagina: NavController,
    private utilServ: UtilitariosService
  ) {}

  ngOnInit() {}

  async validarUsuario() {
    this.objFormLog.patchValue({
      usuario: this.ciUsuario,
    });

    const loading = await this.alerCtrl.create({
      message: 'Verificando...',
      
    });
    loading.present();

    this.partMovilServ.validacionLoge1(this.objFormLog.value).subscribe(
      (resultado: any) => {
        loading.dismiss();
        if (resultado.respValidada === 'A') {

          this.utilServ.setVarSession('ciUsuario', this.ciUsuario);
          this.ciUsuario = "";
          this.irPagina.navigateForward('/login-clave');

        } else {
          if (resultado.respValidada === 'C') {
            this.utilServ.clear();
            this.mostAlerta(
              'Aplicación de uso exclusivo para el Ejercito Ecuatoriano',
              'Error'
            );
            this.ciUsuario = '';
            this.irPagina.navigateForward('/login');
          } else {
            this.utilServ.clear();
            this.mostAlerta('Usuario sin perfil', 'Advertencia');
            this.ciUsuario = '';
            this.irPagina.navigateForward('/login');
          }
        }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      }
    );
    loading.dismiss();

  }

  /*

  async validarUsuario() {
    this.objFormLog.patchValue({
      usuario: this.ciUsuario,
    });

    const loading = await this.alerCtrl.create({
      message: 'Verificando...',
    });
    loading.present();

    this.utilServ.setVarSession('ciUsuario', this.ciUsuario);
    this.partMovilServ.validacionLoge1(this.objFormLog.value).subscribe(
      (resultado: any) => {
        loading.dismiss();
        if (resultado.respValidada === 'A') {
          this.ciUsuario = '';
          this.utilServ.setVarSession('perfUsuario', resultado.respPerfil);
          this.irPagina.navigateForward('/login-clave');
        } else if (resultado.respValidada === 'C') {
          this.utilServ.clear();
          this.mostAlerta(
            'Aplicación de uso exclusivo para el Ejercito Ecuatoriano',
            'Error'
          );
          this.ciUsuario = '';
          this.irPagina.navigateForward('/login');
        } else {
          this.utilServ.clear();
          this.mostAlerta('Usuario sin perfil', 'Advertencia');
          this.ciUsuario = '';
          this.irPagina.navigateForward('/login');
        }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      }
    );
  }
*/
  //Crear alerta
  async mostAlerta(mensaje, mensaje2?) {
    const alert = await this.alerCtrl.create({
      cssClass: 'my-custom-class',
      header: mensaje2,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
