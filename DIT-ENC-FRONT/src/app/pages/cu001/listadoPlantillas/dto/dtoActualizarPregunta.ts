import {DtoPreguntaOpcionGenerarPregunta} from './index'

export class DtoActualizarPregunta{

    id:number;
    idEncuestaPlantilla:number;
    enunciado:string;
    estadoObligatorio:number;
    preguntaOpciones:DtoPreguntaOpcionGenerarPregunta[];
    idTipoPregunta: number;
}