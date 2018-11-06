import { Component, OnInit, OnDestroy,ViewChild, ComponentFactoryResolver, forwardRef,Type} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import { ResultadoDocVerDirectiva,ResultadosDocNoAgrupadaCmp,ResultadosDocObjetoCmp} from "./index";
import { FormControl } from '@angular/forms/src/model';

@Component({
	selector: 'resultadosDocCmp',
	templateUrl: './resultadosDoc.html'
})

export class ResultadosDocCmp{

	private titulo: string= 'Resultados Encuesta';
	private tipoProgramacion=[];
	private componentes=[ResultadosDocObjetoCmp,ResultadosDocNoAgrupadaCmp]
	private tipoProgramacionSelected:number;


	@ViewChild(forwardRef(() =>ResultadoDocVerDirectiva)) 
	private resultaDocVer: ResultadoDocVerDirectiva;
	
	form = new FormGroup({tipo: new FormControl()});

	constructor(private _util: Util, private componentFactoryResolver: ComponentFactoryResolver){
		this.listarTipoProgramacion();
		console.log(this.componentes);
	}

	public verResultado(tipoResultado:any){
		if(tipoResultado){
		this.cargarVistaResultado(tipoResultado-1);
	}
	}

	public cargarVistaResultado(i:number){
		let resultado = this.tipoProgramacion[i];
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(resultado.componente);
		let viewContainerRef = this.resultaDocVer.viewContainerRef;
		viewContainerRef.clear();
		
		let componentRef = viewContainerRef.createComponent(componentFactory);
		(<any>componentRef.instance).tipoProgramacion = (i+1);
	}

	public listarTipoProgramacion(){
        this._util.http({url:'rs/ser/enc/v1/cu002/programacionEncuesta/listarTipoProgramacion',data:{}}).subscribe(
            data=>{
				this.tipoProgramacion = data;
				this.tipoProgramacionSelected =this.tipoProgramacion[0].id;
				
				for (let i=0;i<2;i++){
					this.tipoProgramacion[i].componente=this.componentes[i]
				}
            },
            error=>{
                this._util.alerts(error);
            }
        )
    }
}

