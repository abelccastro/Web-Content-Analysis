import { Component, OnInit, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ListarEncuestaAccionesCmp } from './index';
import { CrearProgramacionModalCmp } from './index';
import { UtilConstRutas, UtilConstParam} from "../_constantes/index";
import { BaConfirmDialogCmp,OPTIONS_MODAL } from "../.././../../core/components/index";
import { forEach } from '@angular/router/src/utils/collection';
import { BaUtilDate } from '../../../../core/util/baUtil/index';

@Component({
	selector: 'listarEncuestaCmp',
	templateUrl: './listarEncuesta.html'
})

export class ListarEncuestaCmp implements OnInit{
	titulo = "Administración de Encuestas";
	// dtoOutlistarProgramacion:DtoOutlistarProgramacion = new DtoOutlistarProgramacion();
	source: LocalDataSource;
	private programaciones:any[];
	@ViewChild(BaConfirmDialogCmp) private confirmModal:BaConfirmDialogCmp;


	constructor(private _util: Util, private _router: Router,private _utilRutas:UtilConstRutas,private _utilCons:UtilConstParam, private _utilDate:BaUtilDate) {
		this.source = new LocalDataSource(this.programaciones);
	}

	ngOnInit(){
			this.listarProgramacion();
	}

	public listarProgramacion(){		

		this._util.http({url:this._utilRutas.LISTAR_PROGRAMACION}).subscribe(
			data=>{
				this.formatear(data);
				this.source.load(this.programaciones);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	};

	public buscarPorNombre(query:string){
		let dto={
			nombre:query,
		}
		this._util.http({url:this._utilRutas.LISTAR_PROGRAMACION_FILTRO, data:dto}).subscribe(
			data=>{
				this.formatear(data);
				this.source.load(this.programaciones);
			},
			error=>{
				this._util.alerts(error);
			}
		)
	}
	
	@ViewChild (forwardRef(() =>CrearProgramacionModalCmp))
	private modalCrearProgramacion:CrearProgramacionModalCmp;		
	
	formatear(data:any){
		this.programaciones=data;
		let value:any;
		this.programaciones.forEach(element => {
			element.fechaInicio = this._utilDate.formatDate(element.fechaInicio,'dd-MM-yyyy hh:mm');
			element.fechaFin = this._utilDate.formatDate(element.fechaFin,'dd-MM-yyyy hh:mm');
			switch(element.nombreEstado){
				case this._utilCons.ESTADO_ENCUESTA_PENDIENTE:
				value = '<i class="fa fa-exclamation-circle mwarning"></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_PUBLICADA:
				value = '<i class="fa fa-exclamation-circle msucess "></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_EJECUTADA:
				value = '<i class="fa fa-exclamation-circle mdanger "></i>'; 
				break;
				case this._utilCons.ESTADO_ENCUESTA_FINALIZADA:
				value = '<i class="fa fa-exclamation-circle minfo "></i>'; 
				break;
			}
			element.estado=value;
		});
		
	}
	generarProgramacion(){
		this.modalCrearProgramacion.abrir();
	}

	public eliminarProgramacion(idProgramacion:number){
		this.confirmModal.openModal({title:'Confirmación',message:'¿Está seguro que desea eliminar esta plantilla ?'}).then(data=>{
			if(data=== OPTIONS_MODAL.OK){
				let dto={
					id:idProgramacion
				}
				this._util.http({url:this._utilRutas.ELIMINAR_PROGRAMACION,data:dto}).subscribe(
					data=>{
						this.listarProgramacion();
						this.confirmModal.close();
					},
					error=>{
						this._util.alerts(error); 
					}
				)
			}
		})
	}
	data = [
		{
		},
	];
	

	settings = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			nombre: {
				title: 'Nombre de la Encuesta',
				type: 'string',
				filter: false,
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
			estado: {
				title: 'Estado',
				type: 'html',
				filter: false
			},
			acciones: {
				title: 'Acciones',
				type: 'custom',
				renderComponent: ListarEncuestaAccionesCmp,
			}
		},
		pager: {
			perPage: 10
		}
	};	
}


