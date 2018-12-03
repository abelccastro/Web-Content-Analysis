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
      { path: 'cu001', loadChildren: 'app/pages/cu001/geracaoAnalise/geracaoAnalise.module#GeracaoAnaliseModule'},      
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
