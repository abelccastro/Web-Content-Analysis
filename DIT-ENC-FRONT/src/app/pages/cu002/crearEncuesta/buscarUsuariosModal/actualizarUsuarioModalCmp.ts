import { Component, Output, ViewChild, OnInit, EventEmitter } from '@angular/core';
import { ValidParamForm } from '../../../../app.index';
import { ModalDirective} from 'ng2-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormControl } from '@angular/forms/src/model';
import { Util } from '../../../../app.index';


@Component({
    selector:'actualizarUsuarioModalCmp',
    templateUrl:'actualizarUsuarioModal.html',
})

export class ActualizarUsuarioModalCmp{

    titulo:string = 'Usuarios';
    usuarios:any ={};

    private formActualizarUsuario: FormGroup;

    @ViewChild('actualizarUsuarioModalCmp') public modal: ModalDirective;
    
    @Output() notify : EventEmitter<any> = new EventEmitter<any>();

    constructor(private _util:Util){
         this.onBuildForm();
    }

    onBuildForm():void{
		this.formActualizarUsuario  = this.appControlsForm.getFormGroup();
		this.formActualizarUsuario.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.formActualizarUsuario));
		this.appControlsForm.onValueChanged(this.formActualizarUsuario);
    }

    private cargarDatos(data:any){           
        this.formActualizarUsuario.controls['nombreCompleto'].setValue(data.nombreCompleto);
        this.formActualizarUsuario.controls['email'].setValue(data.email);
        this.formActualizarUsuario.controls['cargo'].setValue(data.cargo);
    }

    public abrir(data: any = null){
        this.cargarDatos(data);
        this.modal.show();
    }

    public cerrar(){
        this.modal.hide();
    }

    public actualizarUsuario(){      
        this.usuarios = {"nombreCompleto":this.formActualizarUsuario.controls["nombreCompleto"].value,
                        "email":this.formActualizarUsuario.controls["email"].value,
                        "cargo":this.formActualizarUsuario.controls["cargo"].value
                       };
        this.notify.emit(this.usuarios);
    }

    onSubmit(values:any) {
    }

    
    appControlsForm = new ValidParamForm(
		[ {
			"nombreCompleto": [{
                validator   :   "required",
                mensaje     :   "el nombre es requerido"
			}]
		},{
			"email": [{
                validator   :   "pattern",
                valor       :   "([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$)",
                mensaje     :   "Debe ingresar un correo valido."
            },
            {
                validator   :   "required",
                mensaje     :   "email requerido"
            },
            ]
		},{
			"cargo": [{
                validator   :  "required",
                mensaje     :  "el cargo es requerido"
			}]
		}]
    );

    
}