import { Component, Input, OnInit, ViewChild,Injector } from '@angular/core';
import { Router } from "@angular/router";
import { BaConfirmDialogCmp, OPTIONS_MODAL } from '../../../../core/components/index'
import { ViewCell } from 'ng2-smart-table';
import { Util } from '../../../../app.index';
import { UtilConstRutas } from '../_constantes/index';

@Component({
    selector: 'encuestaDocAccionesCmp',
    templateUrl: 'encuestaDocAcciones.html'
})

export class EncuestaDocAccionesCmp implements ViewCell, OnInit {
    private idProgramacionEvaluacion:number;
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private _router: Router,private inj: Injector,private _util: Util,private _utilRutas: UtilConstRutas){
    
    }
    
    ngOnInit() {
        this.idProgramacionEvaluacion = this.rowData.idProgramacionEvaluacion;
    }

    public mostrarEncuesta():void{
        this._router.navigate(['/cu003/encuesta/mostrar/',this.idProgramacionEvaluacion]);
    }

}