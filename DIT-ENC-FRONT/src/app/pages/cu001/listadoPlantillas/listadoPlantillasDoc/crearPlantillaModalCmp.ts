import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Util } from '../../../../app.index';
import {ValidParamForm} from '../../../../app.index';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalOptions } from 'ng2-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormControl } from '@angular/forms/src/model';
import { AppConfig } from '../../../app.config';
import { UtilConstRutas } from "../_constantes/index";
import   {DtoEncuestaPlantilla} from "../dto/index";


@Component({
    selector: 'crearPlantillaModalCmp',
    templateUrl: './crearPlantillaModal.html'
})
export class CrearPlantillaModalCmp implements OnInit{

    private form: FormGroup;
    private titulo: string = "Crear Plantilla";

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


    @ViewChild(ModalDirective) modal: ModalDirective;
    constructor( private _util:Util, private _utilRutas:UtilConstRutas,private _router: Router){
        this.onBuildForm();
    }
    ngOnInit(){}

    onBuildForm():void{
		this.form  = this.appControlsForm.getFormGroup();
		this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged (this.form));
		this.appControlsForm.onValueChanged(this.form);
    }

    public abrir(){
        this.modal.show();
    }
    public cerrar(){
        this.modal.hide();
    }

    public generarPlantilla():void{
        let dto:DtoEncuestaPlantilla = new DtoEncuestaPlantilla();
        dto.$nombre=this.form.controls['nombre'].value;
        dto.$descripcion=this.form.controls['descripcion'].value;

        this._util.http({url:this._utilRutas.REGISTRAR_ENCUESTA_PLANTILLA,data:dto}).subscribe(
            data=>{
                this._router.navigate(['/cu001','listadoplantillas','actualizar',data]);
            },
            error=>{
                this._util.alerts(error);
            }
        )
        this.cerrar();
    }
    
}