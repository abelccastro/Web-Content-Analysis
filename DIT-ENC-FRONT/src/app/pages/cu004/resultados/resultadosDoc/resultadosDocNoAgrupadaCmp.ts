import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import {BaUtilDate,BaUtilString} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';
import { DtoListarResultadoProgramacionEvaluacion} from "../dto";
import {UtilConstRutas,UtilConstParam} from '../_constantes/'
import { error } from 'util';
import { ResultadoDocAccionesCmp } from "./";

@Component({
	selector: 'resultadosDocNoAgrupadaCmp',
	templateUrl: './resultadosDocNoAgrupada.html'
})

export class ResultadosDocNoAgrupadaCmp{

	private titulo: string= 'Resultados Encuesta de satisfacción';
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
			descripcion: {
				title: 'Descripción',
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
		let idTipoProgramacion = this._utilParam.TIPO_PROGRAMACION_NOAGRUPADA;
		this.dtoListarResultadoProgramacionEvaluacion   = new DtoListarResultadoProgramacionEvaluacion(idTipoProgramacion);
		this.listarResultadoPorProgramacionEvaluacion();
	}

	public listarResultadoPorProgramacionEvaluacion():void{

		this._util.http({url:this._utilRutas.LISTAR_RESULTADO_PROGRAMACION_EVALUACION,data:this.dtoListarResultadoProgramacionEvaluacion}).subscribe(
			
			data=>{
				this.resultados = data;
				this.source.load(this.resultados);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}
}

