export class Menus {
    identificador: number;
    nombre: string;
    prioridad: number;
    ruta: string;
    icono: string;
    
    identificadorAplicacion: number;
    nombreAplicacion: string;
    
    identificadorPadre: number;
    nombrePadre: string;

    constructor(){
        this.prioridad = 1;
    }
}