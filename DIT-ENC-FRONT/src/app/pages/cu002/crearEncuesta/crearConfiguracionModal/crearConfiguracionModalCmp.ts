import { Component, Input,Output, ViewChild, OnInit,EventEmitter } from '@angular/core';
import {  ValidParamForm } from '../../../app.index';
import { ModalDirective, TabsetComponent } from 'ng2-bootstrap';

import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

import { FormGroup } from "@angular/forms";
import { IMyDpOptions} from 'mydatepicker' 
import { FormControl } from '@angular/forms/src/model';
import { Util } from '../../../../app.index';
import { DateFormatter } from 'ng2-bootstrap/datepicker/date-formatter';



@Component({
    selector:'crearConfiguracionModalCmp',
    templateUrl:'crearConfiguracionModal.html',
})

export class CrearConfiguracionModalCmp{
    titulo:string = 'Configuración';
    public mytime: any;
    inicio: Date;
    @Output() notify : EventEmitter<any> = new EventEmitter<any>();
    configuracion= {
        "nombreEncuesta":"",
        "plantilla":"",
        "fechaInicio":"",
        "horaInicio":"",
        "minutoInicio":"",
        "fechaFin":"",
        "horaFin":"",
        "minutoFin":"",
        "asunto":"",
        "descripcion":""
    }
    @ViewChild('crearConfiguracionModalCmp') public modal: ModalDirective;
    
    constructor(private _util:Util, private _router:Router){
       this.inicio= new Date(); 
       this.mytime= { date: { year: 2018, month: 10, day: 9 } };
    }

    @ViewChild('staticTabs') staticTabs: TabsetComponent;
	selectTab(tab_id: number) {
		this.staticTabs.tabs[tab_id].active = true;
	}	
	disableEnable() {
		this.staticTabs.tabs[2].disabled = ! this.staticTabs.tabs[2].disabled
	}

    public abrir(){
        this.modal.show();
    }

    public cerrar(){
        this.modal.hide();
    }

    private myDatePickerOptions: IMyDpOptions={
        dateFormat  :   'dd/mm/yyyy',
        todayBtnTxt :   'Hoy',
        dayLabels   :   {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
        monthLabels :   { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' }
    }

    public prueba(event:any){
        this.configuracion.fechaInicio=event.formatted;
    }

    public prueba2(event:any){
        this.configuracion.fechaFin=event.formatted;
    }

    public guardarConfiguracion(){
        this.notify.emit(this.configuracion);
    }

}