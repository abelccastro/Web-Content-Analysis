import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstRutas {
  constructor() {
  }
  
  LISTAR_TIPO_PREGUNTA_ESTADO:string 
  = 'rs/ser/enc/v1/cu001/listadoPlantilla/listarTipoPreguntaPorEstado';

  REGISTRAR_ENCUESTA_PLANTILLA : string = 
  'rs/ser/enc/v1/cu001/listadoPlantilla/registrarEncuestaPlantilla';

  GENERAR_PREGUNTA:string=
  'rs/ser/enc/v1/cu001/listadoPlantilla/generarPregunta';

  ELIMINAR_ENCUESTA_PLANTILLA:string =
  'rs/ser/enc/v1/cu001/listadoPlantilla/eliminarEncuestaPlantilla';

  ACTUALIZAR_ENCUESTA_PLANTILLA:string =
  'rs/ser/enc/v1/cu001/listadoPlantilla/actualizarEncuestaPlantilla';

  CLONAR_ENCUESTA_PLANTILLA:string =
  'rs/ser/enc/v1/cu001/listadoPlantilla/clonarEncuestaPlantilla';

  ELIMINAR_PREGUNTA:string =
  'rs/ser/enc/v1/cu001/listadoPlantilla/eliminarPregunta';

  ACTUALIZAR_PREGUNTA:string =
  'rs/ser/enc/v1/cu001/listadoPlantilla/actualizarPregunta';

  GENERAR_PROGRAMACION:string 
  = 'rs/ser/enc/v1/cu002/programacionEncuesta/generarProgramacion';

}
