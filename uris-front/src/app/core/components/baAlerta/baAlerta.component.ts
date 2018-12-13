import {Component, ViewChild, HostListener, Input, ElementRef, OnInit} from '@angular/core';
import { Util, Alerta } from '../../index';
import { CONST_ESTADOS_HTTP } from '../../const/const.comun';

@Component({
  selector: 'ba-alerta',
  styleUrls: ['./baAlerta.scss'],
  templateUrl: 'baAlerta.html'
})
export class BaAlerta implements OnInit{
  alertas: Alerta[] = [];
	alerta: Alerta;
	constructor(private _util: Util) {
    	this._util.alertas$.subscribe(
            data => {
                this.agregarAlerta(data);
            });
  	}
	ngOnInit(): void {
		/*let ale = new Alerta();
		ale.tipo = "success";
		ale.mensaje = "Actualizacion exitosa.";
		this.agregarAlerta(ale);*/
	}
	/*public agregarAlertaPers(tipo: string, mensaje: string, tiempo: number, icono: string): void {
		let a = new Alerta();
		a.tipo = tipo;
		a.mensaje = mensaje;
		a.tiempo = tiempo;
		a.icono = icono;
		a.fecha = '${(new Date()).toLocaleTimeString()}'
		this.alertas.push(a);
	}*/
	public agregarAlerta(a: Alerta): void {
		switch (a.estado) {
			case CONST_ESTADOS_HTTP.UNAUTHORIZED:
				this._util.goToLogin();
				break;
			default:
				this.alertas.push(a);
				break;
		}
	}

  @Input() position:number = 400;
  @Input() showSpeed:number = 500;
  @Input() moveSpeed:number = 1000;

  @ViewChild('baBackTop') _selector:ElementRef;

  @HostListener('click')
  _onClick():boolean {
    jQuery('html, body').animate({scrollTop:0}, {duration:this.moveSpeed});
    return false;
  }
}
