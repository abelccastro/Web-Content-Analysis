import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../core/nga.module';
import { Ng2SmartTableModule  } from 'ng2-smart-table';
import { ModalModule, TabsModule, TooltipModule } from 'ng2-bootstrap';
import { MyDatePickerModule} from 'mydatepicker';
import { BaConfirmDialogCmp, OPTIONS_MODAL } from '../../../core/components/index'
/* Rutas */
import { routing }       from './listarEncuesta.routing';
/* Interfaz principal */
import { ListarEncuestaCmp, ListarEncuestaAccionesCmp  } from './listarEncuesta/index';
import { CrearProgramacionModalCmp } from './listarEncuesta/index';
import { VerProgramacionCmp } from './verProgramacion/';
import { ListarProgramacionesCmp}  from './listarProgramaciones/'
/* Interfaces secundarias */
import { UtilConstParam, UtilConstRutas } from './_constantes/index';

import { UtilConstComunRutas } from "../../comun/_constantes/index";

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
    ListarEncuestaAccionesCmp
  ],
  providers: [
    UtilConstComunRutas,
    UtilConstParam,
    UtilConstRutas
  ],
  declarations: [
    ListarEncuestaCmp,
    ListarEncuestaAccionesCmp,
    CrearProgramacionModalCmp,
    VerProgramacionCmp,
    ListarProgramacionesCmp
    
    ]
})
export class ListarEncuestaModule {
}
