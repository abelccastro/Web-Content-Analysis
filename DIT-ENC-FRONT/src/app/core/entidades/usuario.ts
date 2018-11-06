import {Applicacion} from './Applicacion'
export class Usuario {
	public uid: string;
	public userPassword: string;
	public newUserPassword: string;
	public displayName: string;
	public givenName: string;
	public sn: string;
	/**
	 * Modificación: se agregaron los apellidos paterno y materno
	 * Fecha: 19-06-2017
	 */
	public apelPat: string;
	public apelMat: string;

	public aplicaciones:any;
	public acciones: string;
	public mail: string;

	constructor() {}

	public nuevoUsuario(a: string, b: string){
		this.uid = a;
		this.userPassword = b;
	}
}