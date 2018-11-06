import { Component, Input, OnInit, ViewChild,Injector } from '@angular/core';
import { Router } from "@angular/router";
import { ViewCell } from 'ng2-smart-table';
import { Util } from '../../../../app.index';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import { UtilConstantes } from '../../../../core/util/utilConstantes';

@Component({
    selector: 'resultadoDocAccionesCmp',
    templateUrl: 'resultadosDocAcciones.html'
})

export class ResultadoDocAccionesCmp implements ViewCell, OnInit {

    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    

    constructor(private _router: Router,private _util: Util,private _utilRutas: UtilConstRutas){
    
    }
    
    ngOnInit() {
        
    }


    public mostrarResultado(){
        this._router.navigate(['cu004/resultados/mostrar/',this.rowData.id]);    
    }
}