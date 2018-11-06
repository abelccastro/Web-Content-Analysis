import { Routes, RouterModule }  from '@angular/router';
import { ListadoPlantillasCmp } from './listadoPlantillas/index';
import { ListadoPlantillaDocCmp} from "./listadoPlantillasDoc/index";
import { ActualizarEncuestaPlantillaCmp } from './actualizarEncuestaPlantilla/index';
import {  MostrarEncuestaPlantillaCmp} from "./mostrarEncuestaPlantilla";

const routes: Routes = [
  {
    path: 'listadoplantillas',
    component: ListadoPlantillasCmp,
    children:[
      {path:'', component: ListadoPlantillaDocCmp},
      {path:'actualizar/:id',component: ActualizarEncuestaPlantillaCmp},
      {path:'mostrar/:id',component:MostrarEncuestaPlantillaCmp}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
