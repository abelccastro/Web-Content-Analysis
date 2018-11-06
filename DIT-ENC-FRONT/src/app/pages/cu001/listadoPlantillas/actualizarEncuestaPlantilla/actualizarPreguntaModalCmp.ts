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
import { DtoActualizarPregunta } from "../dto/index"
import { Validators } from '@angular/forms/src/validators';
import { DtoItem } from "../dto/index";

@Component({
    selector: 'actualizarPreguntaModalCmp',
    templateUrl: 'actualizarPreguntaModal.html',
})

export class ActualizarPreguntaModalCmp implements OnInit {

    private form: FormGroup;
    private titulo: string = 'Actualizar Pregunta';
    private idPregunta:number;
    private tipoPregunta: DtoItem[]; 
    private idTipoPregunta: number;

    appControlsForm = new ValidParamForm(
        [{
            "enunciado": [{
                validator: "required",
            }
            ]
        },{
            "tipoPregunta": [{
                validator: "required",
            }]
        },{
            "estadoObligatorio": [{
                validator: "required",
            }
            ]
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
        this.form.addControl('preguntaOpciones',new FormArray([]));
     }
    ngOnDestroy() { }

    onBuildForm(): void {
        this.form = this.appControlsForm.getFormGroup();
        this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged(this.form));
        this.appControlsForm.onValueChanged(this.form);
    }

    public agregarOpcion() {
        (<FormArray>this.form.controls['preguntaOpciones']).push(
            new FormGroup({
                'valor': new FormControl('',Validators.required),
                'ponderacion': new FormControl('',Validators.required)
        })
        )
    }

    public removerOpcion(opcion: number) {
        (<FormArray>this.form.controls['preguntaOpciones']).removeAt(opcion);
    }

    public desplazar (position:number,offset:number):void {
        let totalOpciones = (<FormArray>this.form.controls['preguntaOpciones']).length;
        let nuevaPosicion:number = position+offset;

        if(nuevaPosicion >=0 && nuevaPosicion < totalOpciones){
            let opciones = this.form.value['preguntaOpciones'];

            let temp = JSON.parse(JSON.stringify(opciones[position]));
            opciones[position]= JSON.parse(JSON.stringify(opciones[nuevaPosicion]));
            opciones[nuevaPosicion]= temp;

            (<FormArray>this.form.controls['preguntaOpciones']).setValue(opciones);
         }
    }


    public abrir(pregunta:any) {

       this.form.removeControl('preguntaOpciones');
       this.form.addControl('preguntaOpciones',new FormArray([]));
       
        this.idPregunta = pregunta.id;

        let opciones:any[]=[];

        for (let i = 0; i < pregunta.opciones.length; i++) {
            (<FormArray>this.form.controls['preguntaOpciones']).push(
                new FormGroup({
                    'valor': new FormControl('',Validators.required),
                    'ponderacion': new FormControl('',Validators.required)
            })
            )
            opciones.push({
                valor:pregunta.opciones[i].valor,
                ponderacion:pregunta.opciones[i].ponderacion
            });
        }
    
        this.form.setValue({
            enunciado:pregunta.enunciado,
            estadoObligatorio:pregunta.estadoObligatorio,
            preguntaOpciones:opciones,
            tipoPregunta : pregunta.idTipoPregunta
        });
    
        this.modal.show();
    }

    public cerrar() {
        this.modal.hide();
    }

    public actualizarPregunta() {
        
        let dtoActualizarPregunta = new DtoActualizarPregunta;

        dtoActualizarPregunta = this.form.value;
        dtoActualizarPregunta.id = this.idPregunta;
        dtoActualizarPregunta.idTipoPregunta = this.idTipoPregunta;

        this._util.http({ url: this._utilRutas.ACTUALIZAR_PREGUNTA,data:dtoActualizarPregunta}).subscribe(
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
    public mostrarFormulario(tipo:number){ 
        this.idTipoPregunta = tipo;
    }
}