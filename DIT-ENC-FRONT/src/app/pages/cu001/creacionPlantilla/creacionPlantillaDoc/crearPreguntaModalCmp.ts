import { Component, Input,Output, ViewChild, OnInit,EventEmitter, OnDestroy } from '@angular/core';
import {  ValidParamForm } from '../../../../app.index';
import { ModalDirective, TabsetComponent } from 'ng2-bootstrap';

import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { Subscription }   from 'rxjs/Subscription';

import { FormGroup } from "@angular/forms";

import { FormControl } from '@angular/forms/src/model';
import {Util} from '../../../../app.index';
import { UtilConstRutas } from "../_constantes/index";
import {DtoItem} from "../dto/index";

@Component({
    selector:'crearPreguntaModalCmp',
    templateUrl:'crearPreguntaModal.html',
})

export class CrearPreguntaModalCmp implements OnInit{
     
    private form: FormGroup;
    private titulo:string = 'Nueva Pregunta';
    private tipoPregunta :DtoItem[];
    pregunta:any ={
        opciones:[],
    };

    appControlsForm = new ValidParamForm(
		[{
			"titulo": [{
					validator: "required",
				}
			]
		}, {
			"tipo": [{
				validator: "required",
			}]
		}]
	);


    @Output() notify : EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(ModalDirective) 
    private modal: ModalDirective;
    
    constructor(private _util:Util,private _utilRutas:UtilConstRutas, private _router:Router){
        this.onBuildForm();
        this.listarTipoPreguntaPorEstado();
    }

    ngOnInit(){}
    ngOnDestroy(){}

    onBuildForm():void{
		this.form  = this.appControlsForm.getFormGroup();
		this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.form));
		this.appControlsForm.onValueChanged(this.form);
    }

    public agregarOpcion(){
        this.pregunta.opciones.push("");
    }

    public removerOpcion(opcion:string){
        this.pregunta.opciones.splice(opcion, 1);
    }

    public guardarPregunta(){
        let pregunta:any = {"titulo":this.form.controls["titulo"].value,
                        "tipo":this.form.controls["tipo"].value,
                        "opciones" : JSON.parse(JSON.stringify(this.pregunta.opciones)),
                       };
        this.notify.emit(pregunta);
        this.cerrar();
    }

    private listarTipoPreguntaPorEstado(){
		this._util.http({url:this._utilRutas.LISTAR_TIPO_PREGUNTA_ESTADO}).subscribe(
				data =>{
                    this.tipoPregunta=data;
				},
				error =>{
					this._util.alerts(error);
				}
		);
	}

    public abrir(){
        this.modal.show();
    }

    public cerrar(){
        this.modal.hide();
    }

}