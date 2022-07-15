import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./paginas/util/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'tab-numerica',
    loadChildren: () => import('./paginas/parteNumerico/tab-numerica/tab-numerica.module').then( m => m.TabNumericaPageModule)
  },
  {
    path: 'tab-detallada',
    loadChildren: () => import('./paginas/parteDetallado/tab-detallada/tab-detallada.module').then( m => m.TabDetalladaPageModule)
  },
  {
    path: 'efectivos',
    loadChildren: () => import('./paginas/efectivos/efectivos/efectivos.module').then( m => m.EfectivosPageModule)
  },
  {
    path: 'disponibles',
    loadChildren: () => import('./paginas/fila/disponibles/disponibles.module').then( m => m.DisponiblesPageModule)
  },
  {
    path: 'fuera-fila',
    loadChildren: () => import('./paginas/fueraFila/fuera-fila/fuera-fila.module').then( m => m.FueraFilaPageModule)
  },
  {
    path: 'login-clave',
    loadChildren: () => import('./paginas/util/login-clave/login-clave.module').then( m => m.LoginClavePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/util/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'buscar',
    loadChildren: () => import('./paginas/util/buscar/buscar.module').then( m => m.BuscarPageModule)
  },
  {
    path: 'selec-unidad',
    loadChildren: () => import('./paginas/util/selec-unidad/selec-unidad.module').then( m => m.SelecUnidadPageModule)
  },
  {
    path: 'crea-fuer-fila',
    loadChildren: () => import('./paginas/fueraFila/crea-fuer-fila/crea-fuer-fila.module').then( m => m.CreaFuerFilaPageModule)
  },
  {
    path: 'nomi-tabl-numerica',
    loadChildren: () => import('./paginas/parteNumerico/nomi-tabl-numerica/nomi-tabl-numerica.module').then( m => m.NomiTablNumericaPageModule)
  },
  {
    path: 'edit-permiso',
    loadChildren: () => import('./paginas/permNoveLAP/edit-permiso/edit-permiso.module').then( m => m.EditPermisoPageModule)
  },
  {
    path: 'most-novedades',
    loadChildren: () => import('./paginas/permNoveLAP/most-novedades/most-novedades.module').then( m => m.MostNovedadesPageModule)
  },
  {
    path: 'edit-novedad',
    loadChildren: () => import('./paginas/permNoveLAP/edit-novedad/edit-novedad.module').then( m => m.EditNovedadPageModule)
  },
  {
    path: 'edit-perm-lap',
    loadChildren: () => import('./paginas/permNoveLAP/edit-perm-lap/edit-perm-lap.module').then( m => m.EditPermLapPageModule)
  },
  {
    path: 'most-perm-lap',
    loadChildren: () => import('./paginas/permNoveLAP/most-perm-lap/most-perm-lap.module').then( m => m.MostPermLapPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./paginas/efectivos/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'asig-semana',
    loadChildren: () => import('./paginas/amanuense/administrar/asig-semana/asig-semana.module').then( m => m.AsigSemanaPageModule)
  },
  {
    path: 'reas-semana',
    loadChildren: () => import('./paginas/amanuense/administrar/reas-semana/reas-semana.module').then( m => m.ReasSemanaPageModule)
  },
  {
    path: 'camb-unidad',
    loadChildren: () => import('./paginas/amanuense/administrar/camb-unidad/camb-unidad.module').then( m => m.CambUnidadPageModule)
  },
  {
    path: 'semana',
    loadChildren: () => import('./paginas/amanuense/mostrar/semana/semana.module').then( m => m.SemanaPageModule)
  },
  {
    path: 'disponibles-ams',
    loadChildren: () => import('./paginas/amanuense/mostrar/disponibles-ams/disponibles-ams.module').then( m => m.DisponiblesAmsPageModule)
  },
  {
    path: 'detalle-ams',
    loadChildren: () => import('./paginas/amanuense/mostrar/detalle-ams/detalle-ams.module').then( m => m.DetalleAmsPageModule)
  },
  {
    path: 'poli-seguridad',
    loadChildren: () => import('./paginas/util/poli-seguridad/poli-seguridad.module').then( m => m.PoliSeguridadPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./paginas/util/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'modal-novedad',
    loadChildren: () => import('./paginas/permNoveLap/modal-novedad/modal-novedad.module').then( m => m.ModalNovedadPageModule)
  },
  {
    path: 'asig-amanuense',
    loadChildren: () => import('./paginas/admin/asig-amanuense/asig-amanuense.module').then( m => m.AsigAmanuensePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
