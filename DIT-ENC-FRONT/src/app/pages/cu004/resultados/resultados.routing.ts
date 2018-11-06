import { Routes, RouterModule }  from '@angular/router';
import { ResultadosCmp} from "./resultados/index";
import { ResultadosDocCmp} from "./resultadosDoc/index";
import { MostrarResultadoCmp } from "./mostrarResultado";

const routes: Routes = [
  {
    path: 'resultados',
    component: ResultadosCmp,
    children: [
      {path:'',component:ResultadosDocCmp},
      {path:'mostrar/:id', component:MostrarResultadoCmp}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
