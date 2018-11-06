
export class DtoEncuestaPlantilla {
    private id:number;
    private nombre:string;
    private descripcion:string;
    
    public set $id(id:number){
        this.id = id;
    }

    public get $id(){
        return this.id;
    }

    public set $nombre(nombre:string){
        this.nombre = nombre;
    }

    public get $nombre(){
        return this.nombre;
    }

    public set $descripcion(descripcion:string){
        this.descripcion = descripcion;
    }

    public get $descripcion(){
        return this.descripcion;
    }
}