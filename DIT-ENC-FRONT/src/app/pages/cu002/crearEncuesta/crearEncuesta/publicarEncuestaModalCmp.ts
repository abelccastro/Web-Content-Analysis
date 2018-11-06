import { Component, ViewChild, Injector} from '@angular/core';
import { Router} from '@angular/router';
import { Util } from '../../../../app.index';
import { ValidParamForm } from '../../../../app.index';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalOptions } from 'ng2-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormControl } from '@angular/forms/src/model';
import { AppConfig } from '../../../app.config';
import { UtilConstRutas } from "../../../cu001/listadoPlantillas/_constantes";
import { IMyDpOptions, IMyDateModel,IMyDate} from 'mydatepicker' ;
import { CrearEncuestaCmp } from './'; 

@Component({
    selector: 'publicarEscuestaModalCmp',
    templateUrl: './publicarEncuestaModal.html',
    styleUrls: ['./crearEncuesta.scss']
})
export class PublicarEncuestaModalCmp {

    private form: FormGroup;
    private titulo: string = "Publicar Encuesta";
    private deshabilitarFechaInicial:boolean=false;
    private selDate: IMyDate = {year: 0, month: 0, day: 0};
    private fechaActual:Date = new Date();
    private myDatePickerOptions: IMyDpOptions={
        dateFormat  :   'dd/mm/yyyy',
        todayBtnTxt :   'Hoy',
        dayLabels   :   {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
		monthLabels :   { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
		disableUntil:   {
                            year: this.fechaActual.getFullYear(), 
						    month:this.fechaActual.getMonth()+1,
                            day: this.fechaActual.getDate()-1
                        }
    }

    @ViewChild('publicarEncuestaModalCmp') public modal: ModalDirective;
    
    constructor( private _util:Util, private inj: Injector){    
        this.onBuildForm();
        this.iniciaFechas();   
    }

    iniciarAlPublicar(){
        this.selDate = {year: this.fechaActual.getFullYear(), 
                        month: this.fechaActual.getMonth() + 1, 
                        day: this.fechaActual.getDate()
                        };
        this.deshabilitarFechaInicial=!this.deshabilitarFechaInicial;
    }
    
    iniciaFechas(){
        this.form.controls['horaInicial'].setValue('00');
        this.form.controls['minutoInicial'].setValue('00');
        this.form.controls['horaFinal'].setValue('00');
        this.form.controls['minutoFinal'].setValue('00');
    }

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

    public publicarEncuesta():void{
        let fechaInicial:Date;
        let fechaFinal:Date = this.form.controls['fechaFinal'].value.jsdate;
        fechaFinal.setHours(this.form.controls['horaFinal'].value);
        fechaFinal.setMinutes(this.form.controls['minutoFinal'].value);
        
            fechaInicial=this.form.controls['fechaInicial'].value.jsdate;
            fechaInicial.setHours(this.form.controls['horaInicial'].value);
            fechaInicial.setMinutes(this.form.controls['minutoInicial'].value);

        if(fechaInicial>fechaFinal && this.fechaActual>fechaFinal){
            this._util.alerts({ "tipo": "danger", "mensaje": "La Fecha Inicial es mayor a la fecha Final"});    
        } else{
            let crearEncuestaCmp: CrearEncuestaCmp = this.inj.get(CrearEncuestaCmp);
            crearEncuestaCmp.publicarEncuesta(fechaInicial, fechaFinal);   
            this.cerrar();
        }
    }

    appControlsForm = new ValidParamForm(
        [{"fechaInicial": [{
                validator: "required",   
        }]
        },{"fechaFinal": [{
                validator: "required",
        }]
        },{"horaInicial":[{
                validator 	:   "pattern",
                valor       :   "(([01]?[0-9]|2[0-3]))"
        },{validator: "required" }]
        },{"minutoInicial":[{
                validator 	:   "pattern",
                valor       :   "([0-5][0-9])"
        },{validator: "required"}]
        },{"horaFinal":[{
                validator 	:   "pattern",
                valor       :   "(([01]?[0-9]|2[0-3]))"
        },{validator: "required"}]
        },{"minutoFinal":[{
                validator 	:   "pattern",
                valor       :   "([0-5][0-9])"
        },{validator: "required"}]
    }]);    
}