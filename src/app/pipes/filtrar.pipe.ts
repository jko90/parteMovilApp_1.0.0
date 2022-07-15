import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrar'
})
export class FiltrarPipe implements PipeTransform {

  transform(arreglo: any[], texto: string = '', columna:string='nombreCompleto'): any[] {

    if (texto === '') {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();

    return arreglo.filter(
      item => item[columna].toLocaleLowerCase().includes(texto)
    );
  }

}
