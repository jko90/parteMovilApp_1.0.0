import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

const apiUrlTare = environment.apiUrlTare;
const apiUrlLoge = environment.apiUrlLoge;

@Injectable({
  providedIn: 'root',
})
export class ParteMovilRestService {
  constructor(private http: HttpClient) {}

  //********************************************************************************************/
  /*
  //GENERICOS
   private ejecutarPeticion<T>(query: string) {
    query = apiUrlTare + query;
    return this.http.get<T>(query);
  }

*/
  private encabezadoJSON() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return httpOptions;
  }

  private encabezadoTknJSON() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: sessionStorage.getItem('tkn'),
      }),
    };
    return httpOptions;
  }

  private ejecutarPeticionJWT<T>(query: string) {
    query = apiUrlTare + query;
    return this.http.get<T>(query, this.encabezadoTknJSON());
  }

  private codigoUnidad() {
    const codUni = sessionStorage.getItem('codUnidad');
    return codUni;
  }

  //********************************************************************************************/

  //PARA EL USO DE LOGIN EXTERNO
 
  validacionLoge1(objPersona) {
    const urlServer = apiUrlLoge + 'login/ingreso1';
    return this.http.post(urlServer, objPersona, this.encabezadoJSON());
  }

  validacionLoge2(objPersona) {
    const urlServer = apiUrlLoge + 'login/ingreso2';
    return this.http.post(urlServer, objPersona, this.encabezadoJSON());
  }

  autorizarPerfil(objPersona) {
    const urlServer = apiUrlTare + 'login/ingreso';
    return this.http.post(urlServer, objPersona, this.encabezadoJSON());
  }

  //ejecutarPeticion

  //********************************************************************************************/

  // PETICIONES
  seleccionUnidades() {
    return this.ejecutarPeticionJWT(
      `unidad/uniAsignada?ciUsuario=${sessionStorage.getItem('ciUsuario')}`
    );
  }

  permisosLAP() {
    return this.ejecutarPeticionJWT(
      `permisosLAP/nomPermLAP?codUnidad=${this.codigoUnidad()}`
    );
  }

  permisoOLAP(permOlap) {
    return this.ejecutarPeticionJWT(
      `permisosLAP/permOLAP?codUnidad=${this.codigoUnidad()}&&permOlap=${permOlap}`
    );
  }

  
  novedades() {
    return this.ejecutarPeticionJWT(
      `novedades/detaNumerico?codUnidad=${this.codigoUnidad()}`
    );
  }
      //`novedades/nomNovedades?codUnidad=${this.codigoUnidad()}`


/*
Esto esta de verificcar que funcion hace
  detalleTablaNumerica() {
    return this.ejecutarPeticionJWT(
      `novedades/detaNumerico?codUnidad=${this.codigoUnidad()}`
    );
  }
*/
  /*********************
    Implementando consulta por tipo de novedad   
    ********************************/

  detallePorTipoNovedad(tipoNovedad) {
    return this.ejecutarPeticionJWT(
      `novedades/detaTipoNovedad?codUnidad=${this.codigoUnidad()}&&tipoNovedad=${tipoNovedad}`
    );
  }

  detalleOtrasNovedades() {
    return this.ejecutarPeticionJWT(
      `novedades/detaOtraNovedad?codUnidad=${this.codigoUnidad()}`
    );
  }
  //detaOtraNovedad
  /*** *************** */

  // Numerico
  numNovedades() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/numMovimientos?codUnidad=${this.codigoUnidad()}`
    );
  }

  numFueraFila() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/numFueraFila?codUnidad=${this.codigoUnidad()}`
    );
  }

  numPermisoLAP() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/numPermLAP?codUnidad=${this.codigoUnidad()}`
    );
  }

  numEfectUnidad() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/totalUnidad?codUnidad=${this.codigoUnidad()}`
    );
  }

  numEfectivosFila() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/numFila?codUnidad=${this.codigoUnidad()}`
    );
  }

  //Nomina
  efectivosUnidad() {
    return this.ejecutarPeticionJWT(
      `efectivos/nomUnidad?codUnidad=${this.codigoUnidad()}`
    );
  }

  //Nomina
  efectivosUnidadNoOrganicos() {
    return this.ejecutarPeticionJWT(
      `efectivos/nomUnidadNoOrg?codUnidad=${this.codigoUnidad()}`
    );
  }

  disponible() {
    return this.ejecutarPeticionJWT(
      `efectivos/nomFila?codUnidad=${this.codigoUnidad()}`
    );
  }

  efectivosFuFi() {
    return this.ejecutarPeticionJWT(
      `fueraFila/nomFueraFila?codUnidad=${this.codigoUnidad()}`
    );
  }

  numNoOrganico() {
    return this.ejecutarPeticionJWT(
      `tabNumerica/numNoOrganico?codUnidad=${this.codigoUnidad()}`
    );
  }

  //Catalogos
  catalogoFuFi() {
    return this.ejecutarPeticionJWT(`catalogos/catFueraFila`);
  }

  catalogoNovedades() {
    return this.ejecutarPeticionJWT(`catalogos/catNovedad`);
  }

  catalogoTipNovedades(tNovedad) {
    console.log("Viendo que va a enviar en lllllllllll ", tNovedad)
    return this.ejecutarPeticionJWT(
      `catalogos/catTipoNovedad?lanTiposol=${tNovedad}`
    );
  }

  catalogoUnidades() {
    return this.ejecutarPeticionJWT(`unidad/totalUnidades`);
  }

  //Nomina
  efectivosSemana() {
    return this.ejecutarPeticionJWT(
      `semana/efectivos?codUnidad=${this.codigoUnidad()}`
    );
  }

  semanaOficClasActual() {
    return this.ejecutarPeticionJWT(
      `semana/consSemana?codUnidad=${this.codigoUnidad()}`
    );
  }

  //********************************************************************************************/
  // ACTUALIZAR
  actualizarPermLAP(objForm) {
    const urlServer = apiUrlTare + 'permisosLAP/editPermLAP';
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }

  actualizarNovedad(objForm) {
    const urlServer = apiUrlTare + 'novedades/editNovedad';
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }
  /*
  actualizarFueraFila(objForm) {
    const urlServer = apiUrl + "fueraFila/editFueraFila";
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }
*/

  actualizarSemana(objForm) {
    const urlServer = apiUrlTare + 'semana/editSemana';
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }

  //********************************************************************************************/
  /// ELIMINAR

  finalizarFueraFila(objForm) {
    const urlServer = apiUrlTare + 'fueraFila/elimFueraFila';
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }

  finalizarSemana(objForm) {
    const urlServer = apiUrlTare + 'semana/elimSemana';
    return this.http.put(urlServer, objForm, this.encabezadoTknJSON());
  }

  //********************************************************************************************/
  /// REGISTRAR
  insertarFueraFila(objPersona) {
    const urlServer = apiUrlTare + 'fueraFila/creFueraFila';
    return this.http.post(urlServer, objPersona, this.encabezadoTknJSON());
  }

  insertarNovedad(objPersona) {
    console.log("Veindo que se va a enviar ", objPersona)
    const urlServer = apiUrlTare + 'novedades/creNovedad';
    return this.http.post(urlServer, objPersona, this.encabezadoTknJSON());
  }

  asignarSemana(objPersona) {
    const urlServer = apiUrlTare + 'semana/asignar';
    console.log('Viendo que va a aenviar ', objPersona);
    return this.http.post(urlServer, objPersona, this.encabezadoTknJSON());
  }
/*
  registrarFalto(objPersona) {
    const urlServer = apiUrlTare + 'novedades/falto';
    console.log('Viendo que va a aenviar ', objPersona);
    return this.http.post(urlServer, objPersona, this.encabezadoTknJSON());
  }
  */
}
