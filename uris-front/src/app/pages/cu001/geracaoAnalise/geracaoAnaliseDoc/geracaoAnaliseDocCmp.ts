import { Component, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util} from '../../../../app.index';
import {BaUtilDate} from '../../../../core/util/baUtil/index';
import { PagesConfig } from '../../../pages.config';
import { ModalDirective } from 'ng2-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewChild } from '@angular/core/src/metadata/di';
import { UtilConstRutas,UtilConstParam } from '../_constantes/index';
import { UtilConstComunRutas } from "../../../comun/_constantes/index";
import { BaConfirmDialogCmp,OPTIONS_MODAL } from "../.././../../core/components/index";
import { ValidParamForm } from '../../../../app.index';
import { FormControl, FormArray } from '@angular/forms/src/model';
import { GenerateAnalysisDto } from "../dto/index";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Headers, RequestOptions } from '@angular/http';



@Component({
	selector: 'geracaoAnaliseDocCmp',
	templateUrl: './geracaoAnaliseDoc.html'
})

export class GeracaoAnaliseDocCmp implements OnInit{
	
	private titulo:string = "Generate Analysis";
	private form: FormGroup;
	private dtoGenerateAnalyse  = new GenerateAnalysisDto;
	private max:number =100;
	private dynamic:number =40;
	private analisys:any=[];


	appControlsForm = new ValidParamForm(
        [{
            "callback": [{
                validator: "required",
            }]
        }]
	);
	
	constructor(private _util: Util, private _utilRutas: UtilConstRutas, private _router: Router, private http:Http) {
        this.onBuildForm();
	}
	
	ngOnInit() {
		this.form.addControl('sites',new FormArray([]));
		this.addSite('sites');
        
     }
    ngOnDestroy() { }

    onBuildForm(): void {
        this.form = this.appControlsForm.getFormGroup();
        this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged(this.form));
        this.appControlsForm.onValueChanged(this.form);
	}
	
	public addSite(modelo) {
        
        (<FormArray>this.form.controls[modelo]).push(
            new FormGroup({
                'site': new FormControl('',Validators.required)
        })
        )
        console.log("agregar Opcion",this.form.controls);
    }

    public removeSite(opcion: number, forArrayName :string) {
        (<FormArray>this.form.controls[forArrayName]).removeAt(opcion);
    }

    public desplazar (position:number,offset:number, forArrayName:string):void {
        let totalOpciones = (<FormArray>this.form.controls[forArrayName]).length;
        let nuevaPosicion:number = position+offset;

        if(nuevaPosicion >=0 && nuevaPosicion < totalOpciones){
            let opciones = this.form.value[forArrayName];

            let temp = JSON.parse(JSON.stringify(opciones[position]));
            opciones[position]= JSON.parse(JSON.stringify(opciones[nuevaPosicion]));
            opciones[nuevaPosicion]= temp;

            (<FormArray>this.form.controls[forArrayName]).setValue(opciones);
         }
	}
	
	public generateAnalysis(idTipoPregunta) {
		this.dtoGenerateAnalyse.callback = this.form.value['callback'];
		this.analisys=[];

		for(let site of this.form.value['sites']){
			this.dtoGenerateAnalyse.sites.push(site.site)
		}
		console.log(this.dtoGenerateAnalyse);
		this._util.showLoader();
        this._util.http({ url: this._utilRutas.GENERATE_ANALISYS, data:this.dtoGenerateAnalyse }).subscribe(
            data => {
				console.log("data");
				console.log(data);
				console.log("analisys");
				this.analisys = data;
				console.log(this.analisys);
				this.form.removeControl('sites');
				this.form.addControl('sites',new FormArray([]));
				this.addSite('sites');

				let headers = new Headers({ 'Content-Type': 'application/json' });
				let options = new RequestOptions({ headers: headers });
				let jsonPayload = {
					sites: data
				}
				console.log( JSON.stringify(jsonPayload));
				this.http.post(this.dtoGenerateAnalyse.callback, JSON.stringify(jsonPayload), options).subscribe(
					data=>{
					},
					error=>{
						console.log(error);
					}
				);

			   // this.form.reset();
			   this._util.hideLoader();
            },
            error => {
				this._util.hideLoader();
                this._util.alerts(error);
            }
        );
	}
	
	private extractData(res: Response) {
		let body = res.json();
			return body || {};
		}
		private handleErrorObservable (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.message || error);
		}
		private handleErrorPromise (error: Response | any) {
		console.error(error.message || error);
		return Promise.reject(error.message || error);
		}	

}
