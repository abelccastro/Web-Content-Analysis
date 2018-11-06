export class DtoPublicarEncuesta{
    
    public idProgramacion:number;
    public nombreEncuesta:string;
    public idPlantilla:number;
    public fechaInicial: string;
    public fechaFinal: string;
    public idTipoProgramacion:number;

    constructor(idProgramacion:number, nombreEncuesta:string, idPlantilla:number,fechaInicial:string,fechaFinal:string, 
                idTipoProgramacion:number){
        this.idProgramacion= idProgramacion;
        this.nombreEncuesta=nombreEncuesta;
        this.idPlantilla=idPlantilla;
        this.fechaInicial=fechaInicial;
        this.fechaFinal=fechaFinal;
        this.idTipoProgramacion = idTipoProgramacion;
        // this.docMatriculas=docMatriculas;
    }
}