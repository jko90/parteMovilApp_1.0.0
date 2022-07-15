import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParteMovilRestService } from 'src/app/servicios/parte-movil-rest.service';
import { UtilitariosService } from 'src/app/servicios/utilitarios.service';

@Component({
  selector: 'app-edit-novedad',
  templateUrl: './edit-novedad.page.html',
  styleUrls: ['./edit-novedad.page.scss'],
})
export class EditNovedadPage implements OnInit {
  persona: any = [];
  newFechaStrg;
  newFechaa;

  objForm = new FormGroup({
    novFecFin: new FormControl(),
    novObserv: new FormControl(),
    memCedulaReg: new FormControl(),
    novCodigo: new FormControl(),
  });

  constructor(
    private partMoviServ: ParteMovilRestService,
    private utilServ: UtilitariosService,
    private ruta: Router
  ) {}

  ngOnInit() {
    if (this.utilServ.validandoEstado()) {
      this.utilServ.$getObjPersona.subscribe(
        (respNovedad: any) => {
          this.persona = respNovedad;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  cambioFecha(event) {
    this.newFechaa = new Date(event.detail.value);

    if (this.newFechaa > new Date()) {
      this.utilServ.mostAlerta( 'La fecha seleccionada es mayor a la fecha actual', 'Error' );
    } else if (this.newFechaa.getTime() < this.persona.fInicio) {
      this.utilServ.mostAlerta( 'La fecha seleccionada es memor a la de salida', 'Error' );
    } else {
      this.newFechaStrg =
        this.newFechaa.getFullYear() + '-' + (this.newFechaa.getMonth() + 1) + '-' +
        this.newFechaa.getDate() + ' ' + this.newFechaa.getHours() + ':' + this.newFechaa.getMinutes();
    }
  }

  finalizarMovimiento() {
    if (this.newFechaa === undefined || this.newFechaStrg === undefined) {
      this.utilServ.mostAlerta('Seleccione una fecha', 'Error');
    } else if (this.newFechaa > new Date()) {
      this.utilServ.mostAlerta('Corrija la fecha de finalización', 'Error');
    } else if (this.newFechaa.getTime() < this.persona.fInicio) {
      this.utilServ.mostAlerta('Corrija la fecha de finalización', 'Error');
    } else {

      var redireccion = sessionStorage.getItem('auxiliar');
      if (redireccion === 'fuerfila' ) {
        this.utilServ.setVarSession('auxiliar', "");
        this.actualizarFueraFila(this.newFechaStrg, this.persona.codigo);
      } else {
        this.utilServ.setVarSession('auxiliar', "");

        this.actualizarNovedad( this.newFechaStrg, this.persona.observacion, this.persona.codigo );
      }

 /*   let i: number = 0;
         this.partMoviServ.catalogoFuFi().subscribe(
           (respCatFF: any) => {
            do {
                if(respCatFF[i].motivo === this.persona.motivo ){
                  this.actualizarFueraFila(this.newFechaStrg, this.persona.codigo);
                  i += respCatFF.length - 1;
                  console.log("Comparacion completada: ",i);
                }else{
                  console.log("Comparacion fallida: ",i);
                }
      
              i++;
          } while (i <= respCatFF.length - 1)
           }
         );
         */
    }
  }

  actualizarNovedad(fechRegistro, observ, codigoEditar) {
    this.objForm.patchValue({
      novFecFin: fechRegistro,
      novObserv: observ,
      memCedulaReg: sessionStorage.getItem('ciUsuario'),
      novCodigo: codigoEditar,
    });

    this.partMoviServ.actualizarNovedad(this.objForm.value).subscribe(
      (resultado: any) => {
        if (resultado === 0) {
          this.utilServ.mostAlerta('Error al finalizar la novedad', 'Error');
        } else {
          this.utilServ.mostAlerta('Actualizado correctamente', 'Información');
          this.ruta.navigate(['/tab-detallada']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Funciona correctamente
  actualizarFueraFila(fechRegistro, codigoEditar) {
    this.objForm.patchValue({
      novFecFin: fechRegistro,
      memCedulaReg: sessionStorage.getItem('ciUsuario'),
      novCodigo: codigoEditar,
    });

    this.partMoviServ.finalizarFueraFila(this.objForm.value).subscribe(
      (resultado: any) => {
        if (resultado === 0) {
          this.utilServ.mostAlerta('Error al finalizar fuera de fila', 'Error');
        } else {
          this.utilServ.mostAlerta( 'Fuera de fila finalizado correctamente', 'Información' );
          this.ruta.navigate(['/fuera-fila']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
