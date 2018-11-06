import { Routes, RouterModule }  from '@angular/router';
import { ListarEncuestaCmp,ListarEncuestaAccionesCmp } from './listarEncuesta/index';
import { VerProgramacionCmp } from './verProgramacion/'
import { ListarProgramacionesCmp } from './listarProgramaciones/'


const routes: Routes = [
  {
    path: 'listarencuesta',
    component: ListarProgramacionesCmp,
    children:[
      {path:'', component: ListarEncuestaCmp},
      {path:'verprogramacion/:id',component:VerProgramacionCmp}
    ]
  },
];

export const routing = RouterModule.forChild(routes);
