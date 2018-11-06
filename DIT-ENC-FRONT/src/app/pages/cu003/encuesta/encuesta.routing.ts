import { Routes, RouterModule }  from '@angular/router';
import { EncuestaCmp } from "./encuesta/index";
import { EncuestaDocCmp } from "./encuestaDoc/index";
import { MostrarEncuestaCmp } from "./mostrarEncuesta";

const routes: Routes = [
  {
    path: 'encuesta',
    component: EncuestaCmp,
    children: [
      {path:'',component:EncuestaDocCmp},
      {path:'mostrar/:id',component:MostrarEncuestaCmp},
      {path:':resultadoenviar',component:EncuestaDocCmp},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
