import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';


/* Rutas */
import { routing }       from './resultados.routing';
/* Interfaz principal */
import {ResultadosCmp} from "./resultados";
/* Interfaces secundarias */
import { ResultadosDocCmp,ResultadosDocNoAgrupadaCmp,ResultadosDocObjetoCmp,ResultadoDocVerDirectiva} from "./resultadosDoc";
import { MostrarResultadoCmp } from "./mostrarResultado";
import { UtilConstParam, UtilConstRutas } from './_constantes/index';
import { UtilConstComunRutas } from "../../comun/_constantes/index";

import { ResultadoDocAccionesCmp } from "./resultadosDoc";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    routing,
    MyDatePickerModule,
    TabsModule
  ],
  entryComponents: [
    ResultadosDocNoAgrupadaCmp,
    ResultadosDocObjetoCmp,
    ResultadoDocAccionesCmp
  ],
  providers: [
    UtilConstRutas,
    UtilConstParam,
    UtilConstComunRutas
  ],
  declarations: [
    ResultadosCmp,
    ResultadosDocCmp,
    ResultadosDocNoAgrupadaCmp,
    ResultadosDocObjetoCmp,
    ResultadoDocVerDirectiva,
    MostrarResultadoCmp,
    ResultadoDocAccionesCmp
  ]
})
export class ResultadosModule {
}
