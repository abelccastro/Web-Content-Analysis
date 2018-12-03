export class Menu {
	constructor(
	    public nombre: string,
	    public ruta: string,
	    public icono: string,
	    public menuHijos: Menu[]
	) { }
}