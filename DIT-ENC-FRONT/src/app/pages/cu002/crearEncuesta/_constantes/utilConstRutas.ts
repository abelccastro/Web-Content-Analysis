
import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstRutas {
    constructor() { }


    CONSULTAR_PROGRAMACION:string 
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/consultarProgramacion';

    CONSULTAR_REGISTROS:string
    = "rs/ser/enc/v1/cu002/programacionEncuesta/consultarRegistros";

    PUBLICAR_ENCUESTA:string
    = "rs/ser/enc/v1/cu002/programacionEncuesta/publicarEncuesta";

    LISTAR_TIPO_PROGRAMACION:string
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/listarTipoProgramacion';
}