import { Component, OnInit, OnDestroy, ViewChild,forwardRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import {ValidParamForm} from '../../../../app.index';
import {CrearPreguntaModalCmp,ActualizarPreguntaModalCmp} from "./index";
import { LocalDataSource } from 'ng2-smart-table';
import { BaConfirmDialogCmp,OPTIONS_MODAL} from "../.././../../core/components/index";
import {UtilConstRutas} from "../_constantes/index";
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { DtoOutConsultarEncuestaPlantilla } from "../dto/dtoOutConsultarEncuestaPlantilla";
import { DtoActualizarEncuestaPlantilla } from '../dto/index';

@Component({
	selector: 'actualizarEncuestaPlantillaCmp',
	templateUrl: './actualizarEncuestaPlantilla.html'
})

export class ActualizarEncuestaPlantillaCmp {
	private form: FormGroup;
	private titulo: string = 'Crear Plantilla de Encuesta';
	private idEncuestaPlantilla:number;
	private dtoOutConsultarEncuestaPlantilla:DtoOutConsultarEncuestaPlantilla = new DtoOutConsultarEncuestaPlantilla();
	private preguntas:any=[];
	private dtoActualizarEncuestaPlantilla: DtoActualizarEncuestaPlantilla = new DtoActualizarEncuestaPlantilla();

	appControlsForm = new ValidParamForm(
		[{
			"nombre": [{
					validator: "required",
				}
			]
		}, {
			"descripcion": [{
				validator: "required",
			}]
		}]
	);

	@ViewChild(BaConfirmDialogCmp) 
	private confirmModal:BaConfirmDialogCmp;
	
	@ViewChild (forwardRef(() =>CrearPreguntaModalCmp))
	private modalCrearPregunta: CrearPreguntaModalCmp;

	@ViewChild (forwardRef(() =>ActualizarPreguntaModalCmp))
	private modalActualizarPregunta: ActualizarPreguntaModalCmp;


	ngOnInit(){
		
		this._route.params.subscribe(params =>{
			this.idEncuestaPlantilla= params['id'];
			this.consultarEncuestaPlantilla();
			this.listarPreguntaPorIdPlantilla();
		});
	}

	onBuildForm():void{
		this.form  = this.appControlsForm.getFormGroup();
		this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.form));
		this.appControlsForm.onValueChanged(this.form);
    }

	constructor(private _util: Util, private _utilRutas:UtilConstRutas,private _utilComunRutas:UtilConstComunRutas, private _router: Router,private _route : ActivatedRoute) {
		this.onBuildForm();
	}

	public consultarEncuestaPlantilla(){
		
		let dto ={
			id:this.idEncuestaPlantilla
		};

		this._util.http({url:this._utilComunRutas.CONSULTAR_ENCUESTA_PLANTILLA, data:dto}).subscribe(
			data=>{
				this.dtoOutConsultarEncuestaPlantilla=data;
				this.dtoActualizarEncuestaPlantilla = data;
			},
			error=>{
				this._util.alerts(error);
			}
		)
	};

	crearPregunta():void{
		this.modalCrearPregunta.abrir(this.idEncuestaPlantilla);
	}

	guardarPregunta(message:any):void{
		this.modalCrearPregunta.cerrar();
	}

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

	public actualizarEncuestaPlantilla():void{

		this.confirmModal.openModal({title:'Confirmación',message:'¿Está seguro que desea actualizar los datos?'}).then(data=>{
			if(data=== OPTIONS_MODAL.OK){
				this._util.http({url:this._utilRutas.ACTUALIZAR_ENCUESTA_PLANTILLA, data:this.dtoActualizarEncuestaPlantilla}).subscribe(
					data=>{
						this._util.alerts(data);
					},
					error=>{
						this._util.alerts(error);
					}
				)
				this.confirmModal.close();
			}
		})
	}

	public eliminarPregunta(pregunta:any): void{

		let dto={
			id: pregunta.id
		}

		this._util.http({url:this._utilRutas.ELIMINAR_PREGUNTA, data:dto}).subscribe(
			data=>{
				this.listarPreguntaPorIdPlantilla();	
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}
	public actualizarPregunta(pregunta:any):void{
		this.modalActualizarPregunta.abrir(pregunta);
	}
}
