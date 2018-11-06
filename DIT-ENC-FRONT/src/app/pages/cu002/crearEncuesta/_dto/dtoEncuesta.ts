export class DtoEncuesta{

    public id:number;
    public nombre:string;
    public tipoEncuesta:string;
    public idEncuestaPlantilla:number;
    public fechaInicio:Date;
    public fechaFin:Date;
    
    constructor(id:number, nombre:string, tipoEncuesta:string,idEncuestaPlantilla:number,fechaInicio:Date,fechaFin:Date ){
        this.id=id 
       this.nombre=nombre 
        this.tipoEncuesta=tipoEncuesta 
        this.idEncuestaPlantilla=idEncuestaPlantilla 
        this.fechaInicio=fechaInicio 
        this.fechaFin=fechaFin 
    }
    
}