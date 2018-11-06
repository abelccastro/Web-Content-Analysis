import { Routes, RouterModule }  from '@angular/router';
import { CreacionPlantillaCmp } from './creacionPlantilla/index';
import { CreacionPlantillaDocCmp } from "./creacionPlantillaDoc/index";

const routes: Routes = [
  {
    path: 'creacionplantilla',
    component: CreacionPlantillaCmp,
    children: [
      {path:'',component:CreacionPlantillaDocCmp}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
