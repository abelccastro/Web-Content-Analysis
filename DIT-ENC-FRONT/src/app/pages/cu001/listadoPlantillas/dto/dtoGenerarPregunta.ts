import {DtoPreguntaOpcionGenerarPregunta} from './index'

export class DtoGenerarPregunta{

    id:number;
    idEncuestaPlantilla:number;
    enunciado:string;
    idTipoPregunta:number;
    estadoObligatorio:number;
    textoAyuda:string;
    opcionDefecto:number;
    preguntaOpciones:DtoPreguntaOpcionGenerarPregunta[];
    idOpcionPreguntaDefecto:number;

}