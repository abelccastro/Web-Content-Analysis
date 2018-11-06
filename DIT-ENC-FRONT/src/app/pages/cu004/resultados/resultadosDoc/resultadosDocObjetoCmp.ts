import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import {BaUtilDate,BaUtilString} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';
import { DtoListarResultadoProgramacionEvaluacion} from "../dto";
import { ResultadoDocAccionesCmp } from "./";

import {UtilConstRutas, UtilConstParam} from '../_constantes/'
import { error } from 'util';

@Component({
	selector: 'resultadosDocObjetoCmp',
	templateUrl: './resultadosDocObjeto.html'
})

export class ResultadosDocObjetoCmp{

	private titulo: string= 'Resultados Encuesta Objeto de evaluación';
	private source: LocalDataSource;
	private dtoListarResultadoProgramacionEvaluacion:DtoListarResultadoProgramacionEvaluacion;
	private resultados:any[]=[];

	settings = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			nombreProgramacion: {
				title: 'Nombre',
				type: 'string',
				filter: false
			},
			escuela: {
				title: 'Escuela',
				type: 'string',
				filter: false
			},
			agrupador: {
				title: 'Agrupador',
				type: 'string',
				filter: false
			},
			descripcion: {
				title: 'Descripción',
				type: 'string',
				filter: false
			},
			docente: {
				title: 'Docente',
				type: 'string',
				filter: false
			},
			puntaje: {
				title: 'Puntaje',
				type: 'string',
				filter: false
			},
			acciones: {
				title: 'Acciones',
				type: 'custom',
				renderComponent: ResultadoDocAccionesCmp,
			}
		},
		pager: {
			perPage: 10
		}
	};

	@Input() tipoProgramacion:number;

	constructor(private _util: Util, private _utilString: BaUtilString, private _utilRutas: UtilConstRutas, private _utilParam:UtilConstParam){
		this.source = new LocalDataSource([]);
		let idTipoProgramacion = this._utilParam.TIPO_PROGRAMACION_AGRUPADA;
		this.dtoListarResultadoProgramacionEvaluacion   = new DtoListarResultadoProgramacionEvaluacion(idTipoProgramacion);
		this.listarResultadoPorProgramacionEvaluacion();
	}

	public listarResultadoPorProgramacionEvaluacion():void{
		this.dtoListarResultadoProgramacionEvaluacion
		this._util.http({url:this._utilRutas.LISTAR_RESULTADO_PROGRAMACION_EVALUACION,data:this.dtoListarResultadoProgramacionEvaluacion}).subscribe(
			data=>{
				this.formatear(data);
				this.source.load(this.resultados);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}

	protected formatear(data){
		this.resultados =data;
		this.resultados.forEach(e=>{
			e.docente = this._utilString.concatenate(e.nombreDocente," ",e.apellidoPaternoDocente, " ",e.apellidoMaternoDocente);
		})
	}

	public generarReporteProgramacionEvaluacion(){
		this._util.showLoader();
		this._util.http({url:this._utilRutas.GENERAR_REPORTE_PROGRAMACION_EVALUACION,data:this.dtoListarResultadoProgramacionEvaluacion,rest:'FILE', tipo:'BLOB'}).subscribe(
			data=>{
				this._util.downloadFiles({tipo:'PDF', data:data, nombre:"Resultados.pdf"})
				this._util.hideLoader();
			},
			error=>{
				this._util.hideLoader();
				this._util.alerts(error);
			}
		)
	}

}

