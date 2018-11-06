import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalModule, TooltipModule ,TabsModule, TimepickerModule, MonthPickerComponent} from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';

/* Rutas */
import { routing }       from './crearEncuesta.routing';

import { CrearEncuestaCmp  } from './crearEncuesta/index';
/* Modales */
import {  CrearConfiguracionModalCmp } from './crearConfiguracionModal/index';
import { BuscarUsuariosModalCmp } from './buscarUsuariosModal/index'
import { ActualizarUsuarioModalCmp } from './buscarUsuariosModal/index'
import { PublicarEncuestaModalCmp } from './crearEncuesta/index'

/* Interfaces secundarias */
import { UtilConstParam, UtilConstRutas } from './_constantes/index';
import { UtilConstComunRutas} from '../../comun/_constantes/'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    Ng2SmartTableModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    routing,
    MyDatePickerModule,
    TabsModule
  ],
  entryComponents: [
    
  ],
  providers: [
    UtilConstRutas,
    UtilConstParam,
    UtilConstComunRutas
  ],
  declarations: [
    CrearEncuestaCmp,
    CrearConfiguracionModalCmp,
    BuscarUsuariosModalCmp,
    ActualizarUsuarioModalCmp,
    PublicarEncuestaModalCmp
    ]
})
export class CrearEncuestaModule {
}
