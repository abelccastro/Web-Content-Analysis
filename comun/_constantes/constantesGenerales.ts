import { Injectable } from '@angular/core';

@Injectable()
export class ConstantesGenerales {

  //UtilConstantes
  public ESTADO_JUSTIFICACION_NINGUNO: number = 0;
  public ESTADO_JUSTIFICACION_PENDIENTE: number = 1;
  public ESTADO_JUSTIFICACION_APROBADO: number = 2;
  public ESTADO_JUSTIFICACION_RECHAZADO: number = 3;

  public ESTADO_RECUPERACION_NINGUNO: number = 0;
  public ESTADO_RECUPERACION_PENDIENTE: number = 1;
  public ESTADO_RECUPERACION_APROBADO: number = 2;
  public ESTADO_RECUPERACION_RECHAZADO: number = 3;

  public ESTADO_SESION_ACTIVA: number = 1;
  public ESTADO_SESION_INACTIVA: number = 0;

  public ESTADO_ANULADO_ACTIVO: number = 1;
  public ESTADO_ANULADO_INACTIVO: number = 0;

  public EXTERNO_SI: number = 1;
  public EXTERNO_NO: number = 0;

  public TIPO_RECUPERACION_CON_JUSTIFICACION: number = 1;
  public TIPO_RECUPERACION_SIN_JUSTIFICACION: number = 0;

  public INFORME_ACT_LECTIVA_ESTADO_GENERADO_OK: number = 1;
  public INFORME_ACT_LECTIVA_ESTADO_GENERADO_FAIL: number = 0;

  public INFORME_ACT_LECTIVA_ESTADO_ANULADO_OK: number = 1;
  public INFORME_ACT_LECTIVA_ESTADO_ANULADO_FAIL: number = 0;

  public INFORME_ACT_LECTIVA_ESTADO_ENVIADO_OK: number = 1;
  public INFORME_ACT_LECTIVA_ESTADO_ENVIADO_FAIL: number = 0;

  public INFORME_ACT_LECTIVA_APROBACION_DIRECTOR_OK: number = 1;
  public INFORME_ACT_LECTIVA_APROBACION_DIRECTOR_FAIL: number = 0;

  public INFORME_ACT_LECTIVA_APROBACION_DECANO_OK: number = 1;
  public INFORME_ACT_LECTIVA_APROBACION_DECANO_FAIL: number = 0;

  public COMPARE_TO_MAYOR: number = 1;
  public COMPARE_TO_MENOR: number = -1;
  public COMPARE_TO_IGUAL: number = 0;

  public SALIDA_DE_CAMPO_ACTIVA: number = 1;
  public SALIDA_DE_CAMPO_INACTIVA: number = 0;

  public DISTRIBUCION_CARGA_ESTADO_ACTIVO: number = 1;
  public DISTRIBUCION_CARGA_ESTADO_INACTIVO: number = 0;

  public ESTADO_TEMPORAL_PASADO: number = -1;
  public ESTADO_TEMPORAL_PRESENTE: number = 0;
  public ESTADO_TEMPORAL_FUTURO: number = 1;

  //UtilConstParam
  public ID_ESTADO_ASISTENCIA_NULA: number = 0;
  public ID_ESTADO_ASISTENCIA_ASISTENCIA: number = 1;
  public ID_ESTADO_ASISTENCIA_FALTA: number = 2;

  public ID_TIPO_ASISTENCIA_NINGUNO: number = 1;
  public ID_TIPO_ASISTENCIA_SISTEMA: number = 2;
  public ID_TIPO_ASISTENCIA_DIT: number = 3;

  public ID_TIPO_INCIDENCIA_1DIA: number = 1;
  public ID_TIPO_INCIDENCIA_MAYOR_1DIA: number = 2;
  public ID_TIPO_INCIDENCIA_MENOR_1DIA: number = 3;

  public TIPO_JUSTIFICACION: number = 1;
  public TIPO_RECUPERACION: number = 2;
  public TIPO_SUSPENSION: number = 3;

  public ASIGNACION_PERSONA_TITULAR: number = 1;
  public ASIGNACION_PERSONA_REMPLAZO: number = 2;

  public SESION_NORMAL: number = 1;
  public SESION_RECUPERACION: number = 2;
  public SESION_NULA: number = 3;
  public SESION_ADICIONAL: number = 4;

  public MSJ_VACIO: string = '';

  public NOMBRE_TIPO_JUSTIFICACION: string = 'JUSTIFICACIÓN';
  public NOMBRE_TIPO_RECUPERACION: string = 'RECUPERACIÓN';
  public NOMBRE_TIPO_SUSPENSION: string = 'SUSPENSIÓN';

  public ID_ESTADO_MENSAJE_PENDIENTE: number = 1;
  public ID_ESTADO_MENSAJE_APROBADO: number = 2;
  public ID_ESTADO_MENSAJE_RECHAZADO: number = 3;

  public NOMBRE_ESTADO_MENSAJE_PENDIENTE: string = 'PENDIENTES';
  public NOMBRE_ESTADO_MENSAJE_APROBADO: string = 'APROBADOS';
  public NOMBRE_ESTADO_MENSAJE_RECHAZADO: string = 'RECHAZADOS';

  constructor() {
  }
}
