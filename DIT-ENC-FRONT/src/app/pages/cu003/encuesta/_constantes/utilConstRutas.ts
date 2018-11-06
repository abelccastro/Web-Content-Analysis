import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstRutas {
  constructor() {
  }
  LISTAR_ENCUESTA_ESTUDIANTE:string 
  = 'rs/ser/enc/v1/cu003/encuesta/listarEncuestaPorEstudiante';

  LISTAR_ENCUESTA_ESTUDIANTE_NOAGRUPADA:string 
  = 'rs/ser/enc/v1/cu003/encuesta/listarEncuestaPorEstudianteNoAgrupada';

  ENVIAR_ENCUESTA:string 
  = 'rs/ser/enc/v1/cu003/encuesta/enviarEncuesta';
}
