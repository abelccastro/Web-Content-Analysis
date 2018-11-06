
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild,forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { PagesConfig } from '../../../pages.config';
import { LocalDataSource } from 'ng2-smart-table';
import {CrearPreguntaModalCmp} from "./index";


@Component({
	selector: 'creacionPlantillaDocCmp',
	templateUrl: './creacionPlantillaDoc.html',
	styleUrls:['./creacionPlantillaDoc.scss']
})

export class CreacionPlantillaDocCmp{
	
	private titulo: string = 'Crear Plantilla de Encuesta';
	private tipoEncuesta: string[]= ["Privada", "Publica"];
	private preguntas:any[];
	private encuesta:any={titulo:'aaa'};
	private editable:any;
	
	constructor(private _util: Util, private _router: Router) {
		this.editable={
			titulo:false,
			descripcion:false
		}
		this.preguntas=[];
	}
	
	@ViewChild (forwardRef(() =>CrearPreguntaModalCmp))
	private modalCrearPregunta: CrearPreguntaModalCmp;

	crearPregunta():void{
		this.modalCrearPregunta.abrir();
	}

	guardarPregunta(message:any):void{
		this.preguntas.push(message);
		this.modalCrearPregunta.cerrar();	
	}

}
