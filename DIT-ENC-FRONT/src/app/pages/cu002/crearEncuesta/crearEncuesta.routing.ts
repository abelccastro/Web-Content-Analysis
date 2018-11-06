import { Routes, RouterModule }  from '@angular/router';
import { CrearEncuestaCmp } from './crearEncuesta/index';

const routes: Routes = [
  {
    path: 'crearencuesta/:id',
    component: CrearEncuestaCmp
  }
];

export const routing = RouterModule.forChild(routes);
