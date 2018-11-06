import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';


/* Rutas */
import { routing }       from './encuesta.routing';
/* Interfaz principal */
import { EncuestaCmp } from "./encuesta";
/* Interfaces secundarias */
import { EncuestaDocCmp } from "./encuestaDoc";
import { MostrarEncuestaCmp } from "./mostrarEncuesta";
import { UtilConstParam, UtilConstRutas } from './_constantes/index';
import { UtilConstComunRutas } from "../../comun/_constantes/index";
import { EncuestaDocAccionesCmp } from "./encuestaDoc";
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
    EncuestaDocAccionesCmp
  ],
  providers: [
    UtilConstRutas,
    UtilConstParam,
    UtilConstComunRutas
  ],
  declarations: [
    EncuestaCmp,
    EncuestaDocCmp,
    EncuestaDocAccionesCmp,
    MostrarEncuestaCmp
  ]
})
export class EncuestaModule {
}
