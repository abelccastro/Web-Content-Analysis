import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/core/login/login.module#LoginModule'
  },
  {
    /* Modificar segun Sistema */
    path: '',
    component: Pages,
    children: [    
      { path: 'cu001', loadChildren: 'app/pages/cu001/listadoPlantillas/listadoPlantillas.module#ListadoPlantillasModule'},      
      { path: 'cu002', loadChildren: 'app/pages/cu002/crearEncuesta/crearEncuesta.module#CrearEncuestaModule'},      
      { path: 'cu002', loadChildren: 'app/pages/cu002/listarEncuesta/listarEncuesta.module#ListarEncuestaModule'},
      { path: 'cu003', loadChildren: 'app/pages/cu003/encuesta/encuesta.module#EncuestaModule'},
      { path: 'cu004', loadChildren: 'app/pages/cu004/resultados/resultados.module#ResultadosModule'},      
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
