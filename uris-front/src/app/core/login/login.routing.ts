import { Routes, RouterModule }  from '@angular/router';

//import { Login } from './login.component';
import { ModuleWithProviders } from '@angular/core';
import { Login } from "./index";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Login,
    data:{withRoutes:false, path:'login'}
  },
  {
    path: 'login2',
    component: Login,
    data:{withRoutes:true, path:'login/login2'}
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
