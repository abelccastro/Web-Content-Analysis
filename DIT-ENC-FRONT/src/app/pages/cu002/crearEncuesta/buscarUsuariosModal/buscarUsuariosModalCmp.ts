import { Component, Input,Output, ViewChild, OnInit,EventEmitter, OnDestroy } from '@angular/core';
import {  ValidParamForm } from '../../../../app.index';
import { ModalDirective, TabsetComponent } from 'ng2-bootstrap';

import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { Subscription }   from 'rxjs/Subscription';

import { FormGroup } from "@angular/forms";

import { FormControl } from '@angular/forms/src/model';
import {Util} from '../../../../app.index';


@Component({
    selector:'buscarUsuariosModalCmp',
    templateUrl:'buscarUsuariosModal.html',
})

export class BuscarUsuariosModalCmp{

    @Output() notify : EventEmitter<any> = new EventEmitter<any>();
    usuarios:any ={};
    titulo:string = 'Usuarios';
    private form: FormGroup;
    tipoUsuario:string;

    @ViewChild('buscarUsuariosModalCmp') public modal: ModalDirective;
    
    constructor(private _util:Util, private _router:Router){
         this.onBuildForm();
    }

    
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
	selectTab(tab_id: number) {
		this.staticTabs.tabs[tab_id].active = true;
	}	
	disableEnable() {
		this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
    }
    

    onBuildForm():void{
		this.form  = this.appControlsForm.getFormGroup();
		this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.form));
		this.appControlsForm.onValueChanged(this.form);
    }

    appControlsForm = new ValidParamForm(
		[ {
			"nombreCompleto": [{
				validator: "required",
			}]
		},{
			"email": [{
				validator: "required",
			}]
		},{
			"cargo": [{
				validator: "required",
			}]
        },{
			"tipo": [{
				validator: "required",
			}]
		}]
	);

    public abrir(){
        this.modal.show();
    }

    public cerrar(){
        this.modal.hide();
    }

    public guardarUsuarios(){      
        this.usuarios = {"nombreCompleto":this.form.controls["nombreCompleto"].value,
                        "email":this.form.controls["email"].value,
                        "cargo":this.form.controls["cargo"].value
                       };
        this.notify.emit(this.usuarios);
    }

    onSubmit(values:any) {
        
            }

    
}