import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstParam {
  constructor() {
  }
  ENCUESTA_AGRUPADA:number 
  = 1;
  ENCUESTA_NO_AGRUPADA:number 
  = 2;
    public ESTADO_ENCUESTA_PENDIENTE: number = 0;
    public ESTADO_ENCUESTA_PUBLICADA: number = 1;
    public ESTADO_ENCUESTA_EJECUTADA: number = 2;
    public ESTADO_ENCUESTA_FINALIZADA: number = 3;
}
