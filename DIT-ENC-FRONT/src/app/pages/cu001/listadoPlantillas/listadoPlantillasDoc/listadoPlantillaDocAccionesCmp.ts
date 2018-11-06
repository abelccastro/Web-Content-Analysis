import { Component, Input, OnInit, ViewChild,Injector } from '@angular/core';
import { Router } from "@angular/router";
import { BaConfirmDialogCmp, OPTIONS_MODAL } from '../../../../core/components/index'
import { ViewCell } from 'ng2-smart-table';
import { Util } from '../../../../app.index';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import {  ListadoPlantillaDocCmp} from "./index";
import { UtilConstantes } from '../../../../core/util/utilConstantes';

@Component({
    selector: 'listadoPlantillaDocAccionesCmp',
    templateUrl: 'listadoPlantillaDocAcciones.html'
})

export class ListadoPlantillaAccionesCmp implements ViewCell, OnInit {

    @ViewChild (BaConfirmDialogCmp) private mensaje: BaConfirmDialogCmp;

    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    private idEncuestaPlantilla:number;
    private editable:boolean;

    constructor(private _router: Router,private inj: Injector,private _util: Util,private _utilRutas: UtilConstRutas,private _utilParam: UtilConstParam){
    
    }
    
    ngOnInit() {
        this.idEncuestaPlantilla= this.rowData.id;    
        this.editable= this.rowData.editable === this._utilParam.ENCUESTA_PLANTILLA_EDITABLE;
    }

    public editarPlantilla(){
        this._router.navigate(['/cu001/listadoplantillas/actualizar/',this.idEncuestaPlantilla]);
    }

    public eliminarPlantilla(){

        let listadoPlantillaDoc: ListadoPlantillaDocCmp = this.inj.get(ListadoPlantillaDocCmp);
        listadoPlantillaDoc.eliminarPlantilla(this.idEncuestaPlantilla);
    }

    public verPlantilla(){
        this._router.navigate(['/cu001/listadoplantillas/mostrar/',this.idEncuestaPlantilla]);    
    }

    public clonarPlantilla(){
        let dto={
            idEncuestaPlantilla:this.idEncuestaPlantilla,
            nombre:'Plantilla clonada',
            descripcion:'Plantilla clonada'
        }

        this._util.http({url:this._utilRutas.CLONAR_ENCUESTA_PLANTILLA,data:dto}).subscribe(
            data=>{
                this._router.navigate(['/cu001/listadoplantillas/actualizar/',data.id]);
            },
            error=>{
                this._util.alerts(error); 
            }
        )
    }
 
}