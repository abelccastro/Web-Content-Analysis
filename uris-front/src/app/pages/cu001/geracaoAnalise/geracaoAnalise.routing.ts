import { Routes, RouterModule }  from '@angular/router';
import { GeracaoAnaliseCmp } from './geracaoAnalise/index';
import { GeracaoAnaliseDocCmp} from "./geracaoAnaliseDoc/index";


const routes: Routes = [
  {
    path: 'geracaoAnalise',
    component: GeracaoAnaliseCmp,
    children:[
      {path:'', component: GeracaoAnaliseDocCmp}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
