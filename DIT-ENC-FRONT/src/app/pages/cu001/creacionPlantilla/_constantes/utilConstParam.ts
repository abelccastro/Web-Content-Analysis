import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstParam {
  constructor() {
  }

  public MSJ_ASIGNACION_PERSONA_TITULAR: string = "TITULAR";
  public MSJ_ASIGNACION_PERSONA_REMPLAZO: string = "REMPLAZO";
  public MSJ_SIN_ASIGNACION: string = "SIN ASIGNACION";

  public MSJ_SESION_NORMAL: string = 'SESION NORMAL';
  public MSJ_SESION_RECUPERACION: string = 'SESION DE RECUPERACIÓN';
  public MSJ_SESION_NULA: string = 'SESION NULA';
  public MSJ_SESION_ADICIONAL: string = 'SESION ADICIONAL';

}
