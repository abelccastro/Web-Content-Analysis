import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstComunRutas {
  constructor() {
  }
  LISTAR_ENCUESTA_PLANTILLA_ESTADO: string =
  'rs/ser/enc/v1/comun/comun/listarEncuestaPlantillaPorEstado';

  LISTAR_ENCUESTA_PLANTILLA: string =
  'rs/ser/enc/v1/comun/comun/listarEncuestaPlantilla';

  CONSULTAR_ENCUESTA_PLANTILLA: string =
  'rs/ser/enc/v1/comun/comun/consultarEncuestaPlantilla';

  LISTAR_PREGUNTA_ID_PLANTILLA:string=
  'rs/ser/enc/v1/comun/comun/listarPreguntaPorIdPlantilla';

  CONSULTAR_PROGRAMACION_EVALUACION:string=
  'rs/ser/enc/v1/comun/comun/consultarProgramacionEvaluacion';
}
