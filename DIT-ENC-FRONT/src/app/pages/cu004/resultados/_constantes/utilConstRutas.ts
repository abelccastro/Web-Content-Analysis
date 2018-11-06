import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstRutas {
  constructor() {
  }
  LISTAR_RESULTADO_PROGRAMACION_EVALUACION:string 
  = 'rs/ser/enc/v1/cu004/resultados/listarResultadoProgramacionEvaluacion';

  GENERAR_REPORTE_PROGRAMACION_EVALUACION:string 
  = 'rs/ser/enc/v1/cu004/resultados/generarReporteProgramacionEvaluacion';

  CONSULTAR_RESULTADO_PROGRAMACION_EVALUACION:string 
  = 'rs/ser/enc/v1/cu004/resultados/consultarResultadoPorProgramacionEvaluacion';

}
