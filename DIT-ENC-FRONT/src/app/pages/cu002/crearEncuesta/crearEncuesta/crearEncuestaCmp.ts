import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild, forwardRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ValidParamForm } from '../../../../app.index';
import { CrearConfiguracionModalCmp } from '../crearConfiguracionModal/';
import { BuscarUsuariosModalCmp } from '../buscarUsuariosModal/';
import { ActualizarUsuarioModalCmp } from '../buscarUsuariosModal/';
import { PublicarEncuestaModalCmp } from './';
import { UtilConstRutas} from "../_constantes/";
import { DtoOutConsultarProgramacion } from '../_dto/';
import { DtoPublicarEncuesta } from '../_dto/';
import { UtilConstComunRutas } from '../../../comun/_constantes';
import { BaUtilDate } from '../../../../core/util/baUtil/';


@Component({
	selector: 'crearEncuestaCmp',
	templateUrl: './crearEncuesta.html',
	styleUrls: ['./crearEncuesta.scss']
})

export class CrearEncuestaCmp implements OnInit{

	titulo:string = "Actualizar Programación de Encuestas";
	private docMatriculas: File; 
	private usuarios:any[];
	private userSelect:JSON;
	source: LocalDataSource;
	
	private formEncuesta: FormGroup;
	private idProgramacion:number;
	private dtoOutConsultarProgramacion:DtoOutConsultarProgramacion = new DtoOutConsultarProgramacion();
	private plantillas:any;
	private tipoProgramacion:any;
	private numRegistros:number = 0;

	private extensiones = ".xls";
    private urlUploadFile = this._utilRutas.CONSULTAR_REGISTROS;
	private maxTamanioFile = 10000000;
	
	constructor(private _util: Util, private _router: Router ,private _route : ActivatedRoute,private _utilRutas:UtilConstRutas, private _utilComunRutas:UtilConstComunRutas, private _baUtilFechas:BaUtilDate ) {
		this.usuarios=[];
		this.source = new LocalDataSource(this.data);
	}

	ngOnInit(): void {
		this._route.params.subscribe(params =>{
			this.idProgramacion= params['id'];
			this.consultarEncuestaPlantilla();
		})
		this.onBuildForm();
		this.listarPlantillas();
		this.listarTipoProgramacion();

	}

	public consultarEncuestaPlantilla(){		
		let dto ={
			id:this.idProgramacion
		};
		this._util.http({url:this._utilRutas.CONSULTAR_PROGRAMACION, data:dto}).subscribe(
			data=>{
				this.dtoOutConsultarProgramacion=data;
				this.cargarDatos(this.dtoOutConsultarProgramacion);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	};

	cargarDatos( dtoOutConsultarProgramacion:DtoOutConsultarProgramacion){
		this.formEncuesta.controls['nombreEncuesta'].setValue(dtoOutConsultarProgramacion.nombre);
		this.formEncuesta.controls['idPlantilla'].setValue(dtoOutConsultarProgramacion.idEncuestaPlantilla);
		this.formEncuesta.patchValue({idTipoProgramacion:dtoOutConsultarProgramacion.idTipoProgramacion});
	}
	onBuildForm():void{
		this.formEncuesta  = this.appControlsForm.getFormGroup();
		this.formEncuesta.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.formEncuesta));
		this.appControlsForm.onValueChanged(this.formEncuesta);
		this.inicializarValoresDefecto();
	}

	inicializarValoresDefecto():void{
			let date = new Date();
			this.formEncuesta.patchValue({fechaInicial: {
			date: {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate()}
			}});
	}
	
	@ViewChild (CrearConfiguracionModalCmp) generarModalConfiguracion: CrearConfiguracionModalCmp;
	public abrirConfiguracion(): void {
	  this.generarModalConfiguracion.modal.show();
	}

	@ViewChild (BuscarUsuariosModalCmp) generarModalBuscarUsuarios: BuscarUsuariosModalCmp;
	public abrirBuscarUsuariosModal(): void{
		this.generarModalBuscarUsuarios.abrir();
	}

	@ViewChild (forwardRef(() =>PublicarEncuestaModalCmp))
	private generarModalPublicarEncuesta:PublicarEncuestaModalCmp;		
	
	public abrirPublicarEncuestaModal(): void{
		this.generarModalPublicarEncuesta.abrir();
	}

	@ViewChild (ActualizarUsuarioModalCmp) generarModalActualizarUsuario: ActualizarUsuarioModalCmp;
	public abrirActualizarUsuarioModal(): void{
		if (this.userSelect==null){
			this._util.alerts({ "tipo": "warning", "mensaje": "Seleccione una fila"});
		} else {
			this.generarModalActualizarUsuario.abrir(this.userSelect);
		}
	}

	public listarPlantillas():void{
		this._util.http({url:this._utilComunRutas.LISTAR_ENCUESTA_PLANTILLA_ESTADO}).subscribe(
			data =>{
				this.plantillas =data;
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}
	public listarTipoProgramacion():void{
		this._util.http({url:this._utilRutas.LISTAR_TIPO_PROGRAMACION}).subscribe(
			data =>{
				this.tipoProgramacion =data;
			},
			error=>{
				this._util.alerts(error);
			}
		)
    }

	guardarConfiguracion(message:any):void{
		this.generarModalConfiguracion.cerrar();
	}

	onUserRowSelect(event) {
		this.userSelect = event.data;	
	}

	actualizarUsuario(message:any):void{
			this.generarModalActualizarUsuario.cerrar();
			this.source.update(this.userSelect,message);
	}

	eliminarUsuario(){
		this.source.remove(this.userSelect);
	}	

	consultarRegistros(){
		let form: FormData= new FormData();
		form.append("file",this.docMatriculas);
		this._util.showLoader();
			this._util.http({url:this._utilRutas.CONSULTAR_REGISTROS,data:form, file:true,json:false }).subscribe(
			data =>{
				this._util.hideLoader();
				this.numRegistros= data;
			},
			error=>{
				this._util.hideLoader();
			}
		)
	}
	publicarEncuesta (fechaInicial:Date , fechaFinal:Date){
		let fechaInicialFormat:string= this._baUtilFechas.formatDate(fechaInicial,'yyyy-MM-dd hh:mm:ss');
		let fechaFinalFormat:string= this._baUtilFechas.formatDate(fechaFinal,'yyyy-MM-dd hh:mm:ss');
		let dtoPublicarEncuesta:DtoPublicarEncuesta = new DtoPublicarEncuesta(
			this.dtoOutConsultarProgramacion.id,
			this.formEncuesta.controls['nombreEncuesta'].value,
			this.formEncuesta.controls['idPlantilla'].value,
			fechaInicialFormat,
			fechaFinalFormat,
			this.formEncuesta.controls['idTipoProgramacion'].value
		);
		let form: FormData= new FormData();
		form.append("file",this.docMatriculas);

		if(dtoPublicarEncuesta && dtoPublicarEncuesta instanceof Object){
			for(let key in dtoPublicarEncuesta){
				if(dtoPublicarEncuesta.hasOwnProperty(key)){
					let value = dtoPublicarEncuesta[key];
					if(!(value instanceof Object)){
						form.append(String(key),String(value));
					}
				}
			}
		}
		this._util.showLoader();
		this._util.http({url:this._utilRutas.PUBLICAR_ENCUESTA,data:form, file:true,json:false }).subscribe(
		data =>{
			this._util.hideLoader();
			this._router.navigate(['/cu002/listarencuesta/']);
		},
		error=>{
			this._util.hideLoader();
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
			nombreCompleto: {
				title: 'Nombre',
				type: 'string',
				filter: false
			},
			email: {
				title: 'Email',
				type: 'string',
				filter: false
			},
			cargo: {
				title: 'Cargo',
				type: 'string',
				filter: false
			}
		},
		pager: {
			perPage: 10
		}
	};


	data = [
	
	]

	onSubmit(values:any) {
	}
	
	appControlsForm = new ValidParamForm(
		[{
			"nombreEncuesta": [{
                validator   :   "required",
                mensaje     :   "el nombre es requerido"
			},
			{
				validator   :   "maxlength",
				valor       :   50,
				mensaje     :   "Máximo 50 caracteres."
			}]
		},{"idPlantilla":[{
				validator   :   "required",
				mensaje     :   "Seleccione la Plantilla"
		}]
		},{"idTipoProgramacion":[{
			validator   :   "required",
			mensaje     :   "Seleccione un tipo"
	}]
	}
	]
    );

}
