import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstParam {

    constructor() { }

    public MSJ_EJEMPLO_NUMERO1: string = "SOY UN EJEMPLO";
    public ESTADO_ENCUESTA_PENDIENTE: string = "pendiente";
    public ESTADO_ENCUESTA_PUBLICADA: string = "publicada";
    public ESTADO_ENCUESTA_EJECUTADA: string = "ejecutada";
    public ESTADO_ENCUESTA_FINALIZADA: string = "finalizada";
}