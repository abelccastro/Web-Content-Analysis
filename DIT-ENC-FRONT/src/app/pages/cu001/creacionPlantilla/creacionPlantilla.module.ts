import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';


/* Rutas */
import { routing }       from './creacionPlantilla.routing';
/* Interfaz principal */
import {CreacionPlantillaCmp} from './creacionPlantilla/index';
import {CreacionPlantillaDocCmp,CrearPreguntaModalCmp} from "./creacionPlantillaDoc/index";

/* Interfaces secundarias */
import { UtilConstParam, UtilConstRutas } from './_constantes/index';
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
  ],
  providers: [
    UtilConstRutas,
    UtilConstParam
  ],
  declarations: [
    CreacionPlantillaCmp,
    CreacionPlantillaDocCmp,
    CrearPreguntaModalCmp
  ]
})
export class CreacionPlantillaModule {
}
