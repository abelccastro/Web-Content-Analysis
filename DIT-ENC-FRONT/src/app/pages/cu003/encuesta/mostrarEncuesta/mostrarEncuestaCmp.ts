import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { BaUtilDate, BaUtilString } from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';
import { ValidParamForm } from '../../../../app.index';
import { FormControl, FormArray } from '@angular/forms/src/model';
import { BaConfirmDialogCmp, OPTIONS_MODAL } from "../.././../../core/components/index";
import { UtilConstRutas } from '../_constantes/'
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { DtoConsultarProgramacionEvaluacion } from "../../../comun/dto";
import { DtoEnviarEncuesta, DtoPreguntaEnviarEncuesta } from "../dto";

@Component({
	selector: 'mostrarEncuestaCmp',
	templateUrl: './mostrarEncuesta.html'
})

export class MostrarEncuestaCmp {

	private form: FormGroup;
	private titulo: string = 'Encuesta';
	private idProgramacionEvaluacion: number;
	private preguntas: any[];
	private dtoConsultarProgramacionEvaluacion: DtoConsultarProgramacionEvaluacion = new DtoConsultarProgramacionEvaluacion();

	//appControlsForm = new ValidParamForm([]);

	@ViewChild(BaConfirmDialogCmp)
	private confirmModal: BaConfirmDialogCmp;

	constructor(private _util: Util, private _utilString: BaUtilString, private _router: Router, private _utilRutas: UtilConstRutas, private _utilComunRutas: UtilConstComunRutas, private _route: ActivatedRoute) {
		//this.form = this.appControlsForm.getFormGroup();
	}

	ngOnInit() {

		this.form = new FormGroup({});

		this._route.params.subscribe(params => {
			this.idProgramacionEvaluacion = params['id'];
			this.consultarProgramacionEvaluacion();
		});
	}

	public consultarProgramacionEvaluacion() {

		let dto = {
			id: this.idProgramacionEvaluacion
		}

		this._util.http({ url: this._utilComunRutas.CONSULTAR_PROGRAMACION_EVALUACION, data: dto }).subscribe(
			data => {
				this.dtoConsultarProgramacionEvaluacion = data;

				if(!this.dtoConsultarProgramacionEvaluacion.descripcionProgramacion)
					this.dtoConsultarProgramacionEvaluacion.descripcionProgramacion = 'Sin descripción';

				this.titulo = this._utilString.concatenate(data.nombre);
				this.listarPreguntaPorIdPlantilla(data.idEncuestaPlantilla);
			},
			error => {
				this._util.alerts(error);
			}
		)
	}

	protected listarPreguntaPorIdPlantilla(idEncuestaPlantilla: number) {
		let dto = {
			idEncuestaPlantilla: idEncuestaPlantilla
		}
		this._util.http({ url: this._utilComunRutas.LISTAR_PREGUNTA_ID_PLANTILLA, data: dto }).subscribe(
			data => {

				data.forEach(e=>{
					this.form.addControl(e.id, new FormControl('',Validators.required));
				})

				this.preguntas = data;
				console.log("preguntas", data);
			},
			error => {
				this._util.alerts(error);
			}
		)
	}

	public enviarEncuesta(): void {
		this.confirmModal.openModal({ title: 'Confirmación', message: '¿Está seguro que desea enviar la encuesta?' }).then(data => {
			if (data === OPTIONS_MODAL.OK && this.checkRespuestas()) {
				let dto = new DtoEnviarEncuesta();
				dto.idProgramacionEvaluacion = this.idProgramacionEvaluacion;
				let seqPregunta: number = 0;

				this.preguntas.forEach(e => {
					let dtoPreguntaEnviarEncuesta = new DtoPreguntaEnviarEncuesta();
					dtoPreguntaEnviarEncuesta.idPregunta = this.preguntas[seqPregunta].id;
					dtoPreguntaEnviarEncuesta.opcionesMarcadas = this.preguntas[seqPregunta].valor;
					dto.preguntas.push(dtoPreguntaEnviarEncuesta);
					seqPregunta++;
				})

				this._util.http({ url: this._utilRutas.ENVIAR_ENCUESTA, data: dto }).subscribe(
					data => {
						this.confirmModal.close();
						this._router.navigate(['/cu003/encuesta/'], { queryParams: {
            				resultadoenviar: "1"
        				}, skipLocationChange: false, relativeTo: this._route});
						

					},
					error => {
						this._util.alerts(error);
						this._util.showLoader();
						this.confirmModal.close()
					}
				)
			}
			else
				this.confirmModal.close();
		})
	}

	public establecerRespuestaSimple(pregunta, idOpcion) {
		pregunta.valor = [idOpcion];
	}

	public establecerRespuestaMultiple(pregunta) {
		pregunta.valor =[];
		for(let i=0; i < pregunta.opciones.length; i++) {
			let opcion = pregunta.opciones[i];
			if(opcion.checked == true) {
				pregunta.valor.push(pregunta.opciones[i].id);
			}
		}
		console.log("pregunta valor multiple", pregunta.valor);
	}

	public checkRespuestas() {
		if(this.preguntas != null) {
			for(var i=0; i < this.preguntas.length; i++){
				let pregunta = this.preguntas[i];
				if(!(pregunta.valor != null && pregunta.valor.length > 0)) {
					return false;
				} 
			}
			return true;
		}

	}
}

