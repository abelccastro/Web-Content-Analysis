import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';

/* Rutas */
import { routing }       from './listadoPlantillas.routing';
/* Interfaz principal */
import {ListadoPlantillaDocCmp,ListadoPlantillaAccionesCmp} from "./listadoPlantillasDoc/index";
import { ListadoPlantillasCmp} from './listadoPlantillas/index';

import { CrearPlantillaModalCmp } from "./listadoPlantillasDoc/index";
/* Interfaces secundarias */
import {ActualizarEncuestaPlantillaCmp,CrearPreguntaModalCmp,ActualizarPreguntaModalCmp} from './actualizarEncuestaPlantilla/index';
import { MostrarEncuestaPlantillaCmp } from "./mostrarEncuestaPlantilla";
import { UtilConstParam, UtilConstRutas } from './_constantes/index';
import { UtilConstComunRutas } from "../../comun/_constantes/index";

import { ListadoPreguntasCmp } from "./listadoPreguntas/index";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    routing,
    MyDatePickerModule
  ],
  entryComponents: [
    ListadoPlantillaAccionesCmp
  ],
  providers: [
    UtilConstRutas,
    UtilConstParam,
    UtilConstComunRutas
  ],
  declarations: [
    ListadoPlantillasCmp,
    ListadoPlantillaDocCmp,
    ListadoPlantillaAccionesCmp,
    CrearPlantillaModalCmp,
    ActualizarEncuestaPlantillaCmp,
    CrearPreguntaModalCmp,
    ActualizarPreguntaModalCmp,
    ListadoPreguntasCmp,
    MostrarEncuestaPlantillaCmp
    ]
})
export class ListadoPlantillasModule {
}
