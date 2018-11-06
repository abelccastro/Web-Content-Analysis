import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import {BaUtilDate,BaUtilString} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';
import { EncuestaDocAccionesCmp } from "./index";
import {UtilConstRutas, UtilConstParam} from '../_constantes/'

@Component({
	selector: 'encuestaDocCmp',
	templateUrl: './encuestaDoc.html'
})

export class EncuestaDocCmp{

	private titulo: string= 'Mis Encuestas';
	private sourceAgrupada: LocalDataSource;
	private sourceNoAgrupada: LocalDataSource;
	private encuestas:any;
	private encuestasAgrupadas:any;
	private encuestasNoAgrupadas : any;
	private resultadoEnviar:null;
	private filtros = {
		"enviado" : 0,
		"idEstadoEncuesta" : 2
	}

	settingsAgrupada = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			nombre: {
				title: 'Nombre',
				type: 'string',
				filter: false
			},
			nombreEscuela: {
				title: 'Escuela',
				type: 'string',
				filter: false
			},
			descripcion: {
				title: 'Selector',
				type: 'string',
				filter: false
			},
			docente: {
				title: 'Docente',
				type: 'string',
				filter: false
			},
			fechaFin: {
				title: 'Cierre',
				type: 'string',
				filter: false
			},
			estadoEncuesta : {
				title: 'Fase',
				type: 'html',
				filter: false
			},
			estadoEnviado : {
				title: 'Est.',
				type: 'html',
				filter: false
			},
			acciones: {
				title: 'Ac.',
				type: 'custom',
				renderComponent: EncuestaDocAccionesCmp,
			}
		},
		pager: {
			perPage: 10
		}
	};

	settingsNoAgrupada = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			nombre: {
				title: 'Nombre',
				type: 'string',
				filter: false
			},
			descripcion: {
				title: 'Descripción',
				type: 'string',
				filter: false
			},
			fechaInicio: {
				title: 'Inicio',
				type: 'string',
				filter: false
			},
			fechaFin: {
				title: 'Cierre',
				type: 'string',
				filter: false
			},
			estadoEncuesta : {
				title: 'Fase',
				type: 'html',
				filter: false
			},
			estadoEnviado :{
				title: 'Est.',
				type: 'html',
				filter: false
			},
			acciones: {
				title: 'Acciones',
				type: 'custom',
				renderComponent: EncuestaDocAccionesCmp,
			}
		},
		pager: {
			perPage: 5
		}
	};

	constructor(private _util: Util,private _utilDate:BaUtilDate,private _utilString:BaUtilString, private _router: Router,private _utilRutas: UtilConstRutas, 
	private _utilParam: UtilConstParam, private _utilCons:UtilConstParam, private _route : ActivatedRoute) {
        this._route.queryParams.subscribe(params => {
            this.resultadoEnviar = params['resultadoenviar'];
        })
		this.sourceAgrupada = new LocalDataSource();
		this.sourceNoAgrupada = new LocalDataSource();
		this.listarEncuestaPorEstudiante();
		this.listarEncuestaPorEstudianteNoAgrupada();
	}

	public listarEncuestaPorEstudiante(){
		this._util.http({url:this._utilRutas.LISTAR_ENCUESTA_ESTUDIANTE,data: this.filtros}).subscribe(
			data=>{
				this.formatear(data);
				console.log("agrupada",data );
				this.encuestasAgrupadas = data;
				this.sourceAgrupada.load(this.encuestasAgrupadas);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}

	public listarEncuestaPorEstudianteNoAgrupada(){
		this._util.http({url:this._utilRutas.LISTAR_ENCUESTA_ESTUDIANTE_NOAGRUPADA,data: this.filtros}).subscribe(
			data=>{
				this.formatear(data);
				console.log("noagrupada",data );
				this.encuestasNoAgrupadas = data;
				this.sourceNoAgrupada.load(this.encuestasNoAgrupadas);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}

	protected formatear(data:any){
		this.encuestas = data;
		this.encuestas.forEach(e=>{
			e.fechaInicio = this._utilDate.formatDate(e.fechaInicio,'dd-MM-yyyy');
		  	e.fechaFin = this._utilDate.formatDate(e.fechaFin,'dd-MM-yyyy');
			e.docente = this._utilString.concatenate(e.nombreDocente, " ",e.apellidoPaternoDocente," ",e.apellidoMaternoDocente);
			let estadoEncuesta="";
			switch(e.idEstadoEncuesta){
				case this._utilCons.ESTADO_ENCUESTA_PENDIENTE:
				estadoEncuesta = '<i class="fa fa-exclamation-circle mwarning"></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_PUBLICADA:
				estadoEncuesta = '<i class="fa fa-exclamation-circle msucess"></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_EJECUTADA:
				estadoEncuesta = '<i class="fa fa-exclamation-circle mdanger"></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_FINALIZADA:
				estadoEncuesta = '<i class="fa fa-exclamation-circle minfo"></i>'; 
				break;
			}
			e.estadoEncuesta = estadoEncuesta;
			let estadoEnviado = "";
			switch(e.enviado){
				case 0:
				estadoEnviado = '<i class="fa fa-square-o"></i>'; 
				break;
				case 1:
				estadoEnviado = '<i class="fa fa-check-square-o"></i>'; 
				break;
			}
			e.estadoEnviado = estadoEnviado;
		});
	}

	public filtrar(){
		this.listarEncuestaPorEstudiante();
		this.listarEncuestaPorEstudianteNoAgrupada();
	}
}

