import { Component, OnInit, OnDestroy, ViewChild,forwardRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import {UtilConstRutas} from "../_constantes/index";
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { DtoOutConsultarEncuestaPlantilla } from "../dto/dtoOutConsultarEncuestaPlantilla";

@Component({
	selector: 'mostrarEncuestaPlantillaCmp',
	templateUrl: './mostrarEncuestaPlantilla.html'
})

export class MostrarEncuestaPlantillaCmp {

	private titulo: string = 'Plantilla';
	private idEncuestaPlantilla:number;
	private dtoOutConsultarEncuestaPlantilla:DtoOutConsultarEncuestaPlantilla = new DtoOutConsultarEncuestaPlantilla();
	private preguntas:any=[];
	
	ngOnInit(){
		this._route.params.subscribe(params =>{
			this.idEncuestaPlantilla= params['id'];
			this.consultarEncuestaPlantilla();
			this.listarPreguntaPorIdPlantilla();
		});
	}

	constructor(private _util: Util, private _utilRutas:UtilConstRutas,private _utilComunRutas:UtilConstComunRutas, private _router: Router,private _route : ActivatedRoute) {
	}

	public consultarEncuestaPlantilla(){
		
		let dto ={
			id:this.idEncuestaPlantilla
		};

		this._util.http({url:this._utilComunRutas.CONSULTAR_ENCUESTA_PLANTILLA, data:dto}).subscribe(
			data=>{
                this.dtoOutConsultarEncuestaPlantilla=data;
                this.titulo=data.nombre;
			},
			error=>{
				this._util.alerts(error);
			}
		)
	};

	
	public listarPreguntaPorIdPlantilla(): void{
		let dto ={
			idEncuestaPlantilla:this.idEncuestaPlantilla
		};

		this._util.http({url:this._utilComunRutas.LISTAR_PREGUNTA_ID_PLANTILLA, data:dto}).subscribe(
			data=>{
				this.preguntas=data;
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}
}
