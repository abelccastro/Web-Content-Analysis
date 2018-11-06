export class DtoListarResultadoProgramacionEvaluacion{
    public nombreProgramacion:string;
    public escuela:string;
    public agrupador:string;
    public nombreDocente:string;
    public idTipoProgramacion:Number;

    constructor(idTipoProgramacion:number){
        this.idTipoProgramacion = idTipoProgramacion;
    }
}