import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util} from '../../../../app.index';
import {BaUtilDate} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ListadoPlantillaAccionesCmp } from "./index";
import { ViewChild } from '@angular/core/src/metadata/di';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { CrearPlantillaModalCmp } from "./index";
import { BaConfirmDialogCmp,OPTIONS_MODAL } from "../.././../../core/components/index";
import { DtoListarEncuestaPlantilla } from "../../../comun/dto/index";

@Component({
	selector: 'listadoPlantillasDocCmp',
	templateUrl: './listadoPlantillasDoc.html',
	styleUrls:['./listadoPlantillasDoc.scss']
})

export class ListadoPlantillaDocCmp{
	
	private titulo:string = "Administración de plantillas";
	private source: LocalDataSource;
	private dtoListarEncuestaPlantilla = new DtoListarEncuestaPlantilla();

	@ViewChild(BaConfirmDialogCmp) private confirmModal:BaConfirmDialogCmp;

	settings = {
		noDataMessage: 'No se encontraron registros.',
		actions: {
			add: false,
			edit: false,
			delete: false
		},
		columns: {
			nombre: {
				title: 'Título',
				type: 'string',
				filter: false
			},
			descripcion:{
				title:'Descripción',
				type:'string',
				filter:false
			},
			fechaModificacion: {
				title: 'Última Actualización',
				type: 'string',
				filter: false
			},
			totalPreguntas: {
				title: 'Total de Preguntas',
				type: 'string',
				filter: false
			},
			acciones: {
				title: 'Acciones',
				type: 'custom',
				renderComponent: ListadoPlantillaAccionesCmp,
			}
		},
		pager: {
			perPage: 10
		}
	};


	private plantillas:any[];

	@ViewChild (forwardRef(() =>CrearPlantillaModalCmp))
	private modalCrearPlantilla:CrearPlantillaModalCmp;

	constructor(private _util: Util, private _utilDate:BaUtilDate, private _utilComunRutas: UtilConstComunRutas, private _utilRutas: UtilConstRutas, private _router: Router) {
		
		this.source = new LocalDataSource(this.plantillas);
		this.listarEncuestaPlantilla();
	};

	public generarPlantilla(){
		this.modalCrearPlantilla.abrir();
	}

	public listarEncuestaPlantillaPorEstado():void{
		this._util.http({url:this._utilComunRutas.LISTAR_ENCUESTA_PLANTILLA_ESTADO}).subscribe(
			data =>{
				this.formatear(data);
				this.source.load(this.plantillas);
			},
			error=>{
				this._util.alerts(error); 
			}
		)
	}

	private formatear(data){
		this.plantillas = data;
		this.plantillas.forEach(e=>{
		  e.fechaModificacion = this._utilDate.formatDate(e.fechaModificacion,'dd-MM-yyyy');
		});
	  }


	public listarEncuestaPlantilla(){

		this._util.http({url:this._utilComunRutas.LISTAR_ENCUESTA_PLANTILLA,data:this.dtoListarEncuestaPlantilla}).subscribe(
			data =>{
				this.formatear(data);
				this.source.load(this.plantillas);
			},
			error=>{
				this._util.alerts(error); 
			}
		)
	}

	public eliminarPlantilla(idEncuestaPlantilla:number){
		this.confirmModal.openModal({title:'Confirmación',message:'¿Está seguro que desea eliminar esta plantilla ?'}).then(data=>{
			if(data=== OPTIONS_MODAL.OK){
				let dto={
					id:idEncuestaPlantilla
				}
		
				this._util.http({url:this._utilRutas.ELIMINAR_ENCUESTA_PLANTILLA,data:dto}).subscribe(
					data=>{
						this.listarEncuestaPlantilla();
						this.confirmModal.close();
					},
					error=>{
						this._util.alerts(error); 
					}
				)
			}
		})
	}
}
