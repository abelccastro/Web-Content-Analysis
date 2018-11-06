import { Component, OnInit, OnDestroy, ViewChild,forwardRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import {UtilConstRutas} from "../_constantes/index";
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import {DtoConsultarProgramacion} from '../dto/'
import { BaUtilDate } from '../../../../core/util/baUtil/';

@Component({
	selector: 'verProgramacionCmp',
	templateUrl: './verProgramacion.html'
})

export class VerProgramacionCmp implements OnInit{

	private titulo: string = 'Ver Programación';
	private idProgramacion:number;
	private fechaInicio:string;
	private fechaCierre:string;
	private dtoConsultarProgramacion:DtoConsultarProgramacion = new DtoConsultarProgramacion();
	private formEncuesta: FormGroup;
	source: LocalDataSource;

	data = [
	
	]
	constructor(private _util: Util, private _router: Router ,private _route : ActivatedRoute,private _utilRutas:UtilConstRutas, private _utilComunRutas:UtilConstComunRutas, private _utilDate:BaUtilDate ) {
		this.source = new LocalDataSource(this.data);
	}
	ngOnInit(): void {
		this._route.params.subscribe(params =>{
			this.idProgramacion= params['id'];
			this.consultarEncuestaPlantilla();
		})

		this.listarObjetosDeEvaluacion();
	}	
	
	public consultarEncuestaPlantilla(){		
		let dto ={
			id:this.idProgramacion
		};
		this._util.http({url:this._utilRutas.CONSULTAR_PROGRAMACION, data:dto}).subscribe(
			data=>{
				this.dtoConsultarProgramacion=data;
				this.fechaInicio = this._utilDate.formatDate(this.dtoConsultarProgramacion.fechaInicio,'dd-MM-yyyy hh:mm');
				this.fechaCierre = this._utilDate.formatDate(this.dtoConsultarProgramacion.fechaFin,'dd-MM-yyyy hh:mm');
			},
			error=>{
				this._util.alerts(error);
			}
		)
	};

	public listarObjetosDeEvaluacion(){
		let dto={
			id:this.idProgramacion
		}
		this._util.http({url:this._utilRutas.LISTAR_OBJETOS_EVALUACION,data:dto}).subscribe(
			data=>{
				this.source.load(data);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}

	settings = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			escuela: {
				title: 'Escuela',
				type: 'string',
				filter: false
			},
			nombreDocente: {
				title: 'Nombre ',
				type: 'string',
				filter: false
			},
			agrupador: {
				title: 'Curso',
				type: 'string',
				filter: false
			}
		},
		pager: {
			perPage: 10
		}
	};
}
