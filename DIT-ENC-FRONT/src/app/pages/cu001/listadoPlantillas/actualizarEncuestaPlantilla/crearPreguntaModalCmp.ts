import { Component, Input, Output, ViewChild, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { ValidParamForm } from '../../../../app.index';
import { ModalDirective, TabsetComponent } from 'ng2-bootstrap';

import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
import { Subscription } from 'rxjs/Subscription';

import { FormGroup } from "@angular/forms";

import { FormControl, FormArray } from '@angular/forms/src/model';
import { Util } from '../../../../app.index';
import { UtilConstRutas } from "../_constantes/index";
import { DtoItem, DtoGenerarPregunta, DtoPreguntaOpcionGenerarPregunta } from "../dto/index";
import { Validators } from '@angular/forms/src/validators';

@Component({
    selector: 'crearPreguntaModalCmp',
    templateUrl: 'crearPreguntaModal.html',
})

export class CrearPreguntaModalCmp implements OnInit {

    private form: FormGroup;
    private titulo: string = 'Nueva Pregunta';
    private idEncuestaPlantilla:number;
    private tipoPregunta: DtoItem[];
    private dtoGenerarPregunta:DtoGenerarPregunta;
    private idTipoPregunta : number;
    appControlsForm = new ValidParamForm(
        [{
            "enunciado": [{
                validator: "required",
            }]
        }
        // ,{
        //     "estadoObligatorio": [{
        //         validator: "required",
        //     }]
        // }
        ,{
            "tipoPregunta": [{
                validator: "required",
            }]
        }]
    );

    @Output() reloadForm: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(ModalDirective)
    private modal: ModalDirective;

    constructor(private _util: Util, private _utilRutas: UtilConstRutas, private _router: Router) {
        this.onBuildForm();
        this.listarTipoPreguntaPorEstado();
    }

    ngOnInit() {
        this.dtoGenerarPregunta = new DtoGenerarPregunta();
        this.form.addControl('preguntaOpciones',new FormArray([]));
        
     }
    ngOnDestroy() { }

    onBuildForm(): void {
        this.form = this.appControlsForm.getFormGroup();
        this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged(this.form));
        this.appControlsForm.onValueChanged(this.form);
    }

    public agregarOpcion(modelo) {
        
        (<FormArray>this.form.controls[modelo]).push(
            new FormGroup({
                'valor': new FormControl('',Validators.required),
                'ponderacion': new FormControl('',Validators.required)
        })
        )
        console.log("agregar Opcion",this.form.controls);
    }

    public removerOpcion(opcion: number, forArrayName :string) {
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


    public generarPregunta(idTipoPregunta) {
        
        this.dtoGenerarPregunta = this.form.value;
        this.dtoGenerarPregunta.idTipoPregunta = this.idTipoPregunta;
        this.dtoGenerarPregunta.idEncuestaPlantilla = this.idEncuestaPlantilla;
        //this.dtoGenerarPregunta.estadoObligatorio=Number(this.form.controls["estadoObligatorio"].value);

        this._util.http({ url: this._utilRutas.GENERAR_PREGUNTA, data:this.dtoGenerarPregunta }).subscribe(
            data => {
                this.form.reset();
                this.reloadForm.emit();
            },
            error => {
                this._util.alerts(error);
            }
        );
        this.cerrar();
    }

    private listarTipoPreguntaPorEstado() {
        this._util.http({ url: this._utilRutas.LISTAR_TIPO_PREGUNTA_ESTADO }).subscribe(
            data => {
                console.log("listarTipoPreguntaPorEstado", data);
                this.tipoPregunta = data;
            },
            error => {
                this._util.alerts(error);
            }
        );
    }

    public abrir(idEncuestaPlantilla:number) {
       this.form.removeControl('preguntaOpciones');
       this.form.addControl('preguntaOpciones',new FormArray([]));
        this.idEncuestaPlantilla =idEncuestaPlantilla;
        this.modal.show();
    }

    public cerrar() {
        this.modal.hide();
    }

    public mostrarFormulario(tipo:number){ 
        console.log(tipo); 
        console.log(this.form); 
        switch(tipo){ 
            case 0:{ 
                this.form.removeControl('preguntaOpciones'); 
                this.form.removeControl('opcionDefecto'); 
                this.form.removeControl('opcionMultiple'); 
                this.form.addControl('tipoEntrada', new FormControl('')); 
                this.form.addControl('textoAyuda', new FormControl('')); 
                break; 
                 
            } 
            case 1:{ 
                this.idTipoPregunta = 1;
                this.form.removeControl('tipoEntrada'); 
                this.form.removeControl('textoAyuda'); 
                this.form.removeControl('opcionMultiple'); 
                this.form.addControl('preguntaOpciones',new FormArray([])); 
                this.form.addControl('opcionDefecto',new FormControl('')); 
                break; 
            } 
            case 2:{ 
                this.idTipoPregunta = 2;
                this.form.removeControl('opcionDefecto'); 
                this.form.removeControl('tipoEntrada'); 
                this.form.removeControl('textoAyuda'); 
                this.form.removeControl('preguntaOpciones'); 
                this.form.addControl('opcionMultiple',new FormArray([])); 
                break; 
            } 
            default: { 
                break; 
            } 
        } 
    } 
}