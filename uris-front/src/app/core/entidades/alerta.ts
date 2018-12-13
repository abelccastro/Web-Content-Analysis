import { CONST_ESTADOS_HTTP } from '../const/const.comun';

const listaerrores = [
	"success", "exito",
	"warning", "cuidado",
	"danger", "peligro", 
	"info", "informativo",
	"error_bug",
	"error_neg",
	"error_ext",
	"error_rpt"
	];

export class Alerta {
	public tipo: string;
	public mensaje: string;
	public tiempo: number;
	public icono: string;
	public titulo: string;
	public fecha: string;
	public estado: number;

	constructor(a: any) {
		this.mensaje = a.mensaje;
		this.icono = a.icono;
		this.titulo = a.titulo;
		this.fecha = new Date().toLocaleDateString() + ", "+ new Date().toLocaleTimeString();
		
		if(a.hasOwnProperty("tipo")) {
			this.tipo = a.tipo;
			if(listaerrores.indexOf(a.tipo) == -1 )
				this.tipo = "default";
		}
		else {
			this.tipo = "default";
		}

		if(a.hasOwnProperty("tiempo")) {
			this.tiempo = a.tiempo;
			if(listaerrores.indexOf(a.tiempo) == -1 )
				this.tiempo = 3000;
		}
		else {
			this.tiempo = 3000;
		}

		if(a.hasOwnProperty("estado")) {
			this.estado = a.estado;
			switch (this.estado) {
				case CONST_ESTADOS_HTTP.UNAUTHORIZED:
					this.mensaje = CONST_ESTADOS_HTTP.UNAUTHORIZEDMSG;
					this.tipo = "error_rpt";
					break;
			}
		}
	}
}