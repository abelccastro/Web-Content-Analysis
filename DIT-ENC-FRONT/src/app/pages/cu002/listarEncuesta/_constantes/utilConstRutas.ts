
import { Injectable } from '@angular/core';

@Injectable()
export class UtilConstRutas {
    constructor() { }

    GENERAR_PROGRAMACION:string 
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/generarProgramacion';

    LISTAR_PROGRAMACION:string
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/listarProgramacion';

    LISTAR_PROGRAMACION_FILTRO: string 
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/listarProgramacionFiltro';

    ELIMINAR_PROGRAMACION:string
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/eliminarProgramacion';

    CONSULTAR_PROGRAMACION:string 
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/consultarProgramacion';

    LISTAR_OBJETOS_EVALUACION:string
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/listarObjetosEvaluacion';

    LISTAR_TIPO_PROGRAMACION:string
    = 'rs/ser/enc/v1/cu002/programacionEncuesta/listarTipoProgramacion';

    EJECUTAR_PROGRAMACION:string
    = "rs/ser/enc/v1/cu002/programacionEncuesta/ejecutarProgramacion";

    FINALIZAR_PROGRAMACION:string
    = "rs/ser/enc/v1/cu002/programacionEncuesta/finalizarProgramacion";
}