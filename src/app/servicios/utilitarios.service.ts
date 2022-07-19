import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ParteMovilRestService } from './parte-movil-rest.service';
import jwt_decode from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilitariosService {
  private ObjPersona = new BehaviorSubject<{}>({});
  $getObjPersona = this.ObjPersona.asObservable();

  constructor(
    private alertaCtrl: AlertController,
    private irPagina: NavController,
    private partMoviServ: ParteMovilRestService
  ) {}

  //Crear alerta global
  async mostAlerta(mensaje, head?) {
    const alert = await this.alertaCtrl.create({
      cssClass: 'my-custom-class',
      header: head,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async suspenderPermLAP(mensaje) {
    console.log('aaqq', mensaje);
    const alert = await this.alertaCtrl.create({
      header: mensaje,
      subHeader: 'SUSPENDER ' + mensaje,
      message: 'ESTA SEGURO DE SUSPENDER ' + mensaje,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: (blah) => {
            console.log('Boton cancelar');
          },
        },
        {
          text: 'SI',
          handler: (blah) => {
            let fecha = Date.now();
            console.log('Boton OK', fecha);
          },
        },
      ],
    });
    await alert.present();
  }

  setArray(key: string, dato: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(dato));
    } catch (error) {
      console.log(error);
    }
  }

  getArray(key: string) {
    try {
      return JSON.stringify(key);
    } catch (error) {
      console.log(error);
    }
  }

  setArrayLocal(key: string, dato: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(dato));
    } catch (error) {
      console.log(error);
    }
  }

  getArrayLocal(key: string) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (error) {
      console.log(error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  //Limpiar memoria local
  clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  //Crear variable de sessión
  setVarSession(key: string, dato: any) {
    try {
      sessionStorage.setItem(key, dato);
    } catch (error) {
      console.log(error);
    }
  }

  getVarSession(key: string) {
    try {
      sessionStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  enviarObjPersona(dato: any) {
    this.ObjPersona.next(dato);
  }

  //// VALIDACIONES DE TOKEN
  private validarTkn() {
    if (!sessionStorage.getItem('tkn')) {
      return this.irPagina.navigateForward('/login');
    } else {
      return true;
    }
  }

  private getTknDecode(): any {
    return jwt_decode(sessionStorage.getItem('tkn')!);
  }

  private expTknDecode(): number {
    return this.getTknDecode().valueOf().exp - Date.now() / 1000;
  }

  validandoEstado() {
    if (this.validarTkn()) {
      console.log("Veindo que hay ",this.expTknDecode())
      if (this.expTknDecode() > 0 && this.expTknDecode() < 50) {
    console.log("viendo si va actualizar el token ", this.expTknDecode() , )

        return this.actualizarToken();
      } else if (this.expTknDecode() < 0) {
        return this.irPagina.navigateForward('/bloqueo');
      }
      return true;
    } else {
      return this.irPagina.navigateForward('/login');
    }
  }

  objForm = new FormGroup({
    usuario: new FormControl()
  });

  private actualizarToken() {
    console.log("viendo si va actualizar el token ", )
    this.objForm.patchValue({
      usuario: sessionStorage.getItem('ciUsuario')
    });
    this.partMoviServ.actualizarTkn(this.objForm.value).subscribe((resultado: any) => {
        if (resultado.JWT != null) {
          sessionStorage.setItem('tkn', resultado.JWT);
          this.irPagina.navigateForward('/inicio');
        } else {
          this.irPagina.navigateForward('/login');
        }
      });
  }
}
