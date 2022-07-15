import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-login-clave',
  templateUrl: './login-clave.page.html',
  styleUrls: ['./login-clave.page.scss'],
})
export class LoginClavePage implements OnInit {

  objFormValid = new FormGroup({
    usuario: new FormControl()
  });

  constructor(
    private partMoviServ: ParteMovilRestService,
    private irPagina: NavController,
    private utilServ: UtilitariosService,
    private alerCtrl: AlertController
  ) {}

  claveUsuario: string;
  cont: number = 0;

  objFormLog = new FormGroup({
    usuario: new FormControl(),
    contrasenia: new FormControl(),
  });

  ngOnInit() {

  }

  async validarClave() {
    this.objFormLog.patchValue({
      usuario: sessionStorage.getItem('ciUsuario'),
      contrasenia: this.claveUsuario,
    });

    const loading = await this.alerCtrl.create({
      message: 'Verificando...',
    });
    loading.present();

    this.partMoviServ.validacionLoge2(this.objFormLog.value).subscribe(
      (resultado: any) => {
        loading.dismiss();
        console.log("Veindo si trae el token ",resultado )

        if (resultado.respValidada === 'A') {
          this.claveUsuario = '';

          this.objFormValid.patchValue({
            usuario: sessionStorage.getItem('ciUsuario')
          });

          sessionStorage.setItem('tkn', resultado.JWT);
          this.validandoPerfil(this.objFormValid.value);

        } else {
          this.claveUsuario = '';
          this.cont++;
          if (this.cont <= 3) {
            //this.utilServ.clear();
            this.utilServ.mostAlerta(
              'Contraseña incorrecta, ingrese nuevamente',
              'Error'
            );
            this.irPagina.navigateForward('/login-clave');
          } else {
            this.utilServ.mostAlerta('Contraseña incorrecta', 'Advertencia');
            this.irPagina.navigateForward('/login');
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async validandoPerfil(objFormLog) {
    const loading = await this.alerCtrl.create({
      message: 'Validando...',
    });
    loading.present();

    this.partMoviServ.autorizarPerfil(objFormLog).subscribe(
      (resultado: any) => {
        loading.dismiss();
        if (resultado.respValidada === 'A') {
          this.utilServ.setVarSession('perfUsuario', resultado.respPerfil);
          this.irPagina.navigateForward('/selec-unidad');
        } else {
          this.utilServ.mostAlerta('Usuario sin perfil', 'Advertencia');
          this.irPagina.navigateForward('/login');
        }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      }
    );
  }
}
