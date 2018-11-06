import { DtoPreguntaEnviarEncuesta} from "./";

export class DtoEnviarEncuesta{

    public idProgramacionEvaluacion:number;
    public preguntas: DtoPreguntaEnviarEncuesta[] = [];

    constructor(){
    }
}