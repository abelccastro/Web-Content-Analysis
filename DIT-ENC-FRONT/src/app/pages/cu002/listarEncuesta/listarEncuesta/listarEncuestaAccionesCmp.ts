import { Component, Input, OnInit, ViewChild, Injector } from '@angular/core';
import { BaConfirmDialogCmp, OPTIONS_MODAL } from '../../../../core/components/index'
import { ViewCell } from 'ng2-smart-table';
import { Router } from "@angular/router";
import { Util } from '../../../../app.index';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import { ListarEncuestaCmp } from './index'

@Component({
    selector: 'listarEncuestaAccionesCmp',
    templateUrl: 'listarEncuestaAcciones.html'
})

export class ListarEncuestaAccionesCmp implements ViewCell, OnInit {

    @ViewChild (BaConfirmDialogCmp) private mensaje: BaConfirmDialogCmp;
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    idProgramacion:number;
    estado:string;
    estadoPendiente:boolean;
    estadoPublicado:boolean;
    estadoEjecutado:boolean;
    estadoFinalizado:boolean;

    constructor(private _router: Router,private inj: Injector,private _util: Util,private _utilRutas: UtilConstRutas, private _utilConstantes:UtilConstParam){
    
    }

    ngOnInit() {
        this.idProgramacion= this.rowData.id;    
        this.estado=this.rowData.nombreEstado;
        this.estadoPendiente=(this.estado ===this._utilConstantes.ESTADO_ENCUESTA_PENDIENTE)?true:false;
        this.estadoPublicado=(this.estado ===this._utilConstantes.ESTADO_ENCUESTA_PUBLICADA)?true:false;
        this.estadoEjecutado=(this.estado ===this._utilConstantes.ESTADO_ENCUESTA_EJECUTADA)?true:false;
        this.estadoFinalizado=(this.estado ===this._utilConstantes.ESTADO_ENCUESTA_FINALIZADA)?true:false;
  
    }

    public publicarProgramacion(){
        this._router.navigate(['/cu002','crearencuesta',this.idProgramacion]);
    }

    public eliminarProgramacion(){
        let listarEncuestaCmp: ListarEncuestaCmp = this.inj.get(ListarEncuestaCmp);
        listarEncuestaCmp.eliminarProgramacion(this.idProgramacion);
    }

    public verProgramacion(){
        this._router.navigate(['/cu002/listarencuesta/verprogramacion/',this.idProgramacion]);
    }    
    public irResultados(){
        this._router.navigate(['/cu004/resultados/']);
    }

    public ejecutarProgramacion(){

        let dto={
            idProgramacion:this.idProgramacion
        };

        this._util.http({url:this._utilRutas.EJECUTAR_PROGRAMACION, data:dto}).subscribe(
            data=>{
                this.estadoEjecutado=true;
                this.estadoPublicado=false;
                this._util.alerts(data);
            },
            error=>{
                this._util.alerts(error);
            }
        )
    }

    public finalizarProgramacion(){

        let dto={
            idProgramacion:this.idProgramacion
        };

        this._util.http({url:this._utilRutas.FINALIZAR_PROGRAMACION, data:dto}).subscribe(
            data=>{
                this.estadoFinalizado=true;
                this.estadoEjecutado=false;
                this._util.alerts(data);
            },
            error=>{
                this._util.alerts(error);
            }
        )
    }
}