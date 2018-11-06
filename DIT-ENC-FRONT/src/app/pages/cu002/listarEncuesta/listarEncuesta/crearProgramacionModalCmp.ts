import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../../../app.index';
import { BaUtilDate, BaUtilString } from '../../../../core/util/baUtil/index';
import { ValidParamForm } from '../../../../app.index';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalOptions } from 'ng2-bootstrap';
import { FormGroup } from "@angular/forms";
import { FormControl } from '@angular/forms/src/model';
import { AppConfig } from '../../../app.config';
import { UtilConstComunRutas } from '../../../comun/_constantes/';
import { UtilConstRutas } from "../_constantes/index";
import { DtoGenerarProgramacion } from "../dto/index";
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';

@Component({
    selector: 'crearProgramacionModalCmp',
    templateUrl: './crearProgramacionModal.html',
    styleUrls: ['./listarEncuesta.scss']
})
export class CrearProgramacionModalCmp implements OnInit {

    private form: FormGroup;
    private titulo: string = "Crear Programación";
    private plantillas: any[];
    private tipoProgramacion = [];
    private opcion: string;
    @ViewChild(ModalDirective) modal: ModalDirective;

    constructor(private _util: Util, private _utilString: BaUtilString, private _utilDate: BaUtilDate, private _utilRutas: UtilConstRutas, private _utilComunRutas: UtilConstComunRutas, private _router: Router) {

        this.onBuildForm();
        this.listarPlantillas();
        this.listarTipoProgramacion();
    }


    ngOnInit() { }

    onBuildForm(): void {
        this.form = this.appControlsForm.getFormGroup();
        this.form.valueChanges.subscribe(data => this.appControlsForm.onValueChanged(this.form));
        this.appControlsForm.onValueChanged(this.form);
    }

    public abrir() {
        this.modal.show();
    }
    public cerrar() {
        this.form.reset();
        this.modal.hide();
    }

    public generarProgramacion(): void {
        let dto: DtoGenerarProgramacion = new DtoGenerarProgramacion();

        dto.nombre = this.form.controls['nombreEncuesta'].value;
        dto.idEncuestaPlantilla = this.form.controls['plantilla'].value.id;
        dto.idTipoProgramacion = this.form.controls['tipoProgramacion'].value;
        dto.descripcion=this.form.controls['descripcion'].value;

        this._util.http({ url: this._utilRutas.GENERAR_PROGRAMACION, data: dto }).subscribe(
            data => {
                this._router.navigate(['/cu002', 'crearencuesta', data]);
            },
            error => {
                this._util.alerts(error);
            }
        )
        this.cerrar();
    }

    public listarPlantillas(): void {
        this._util.http({ url: this._utilComunRutas.LISTAR_ENCUESTA_PLANTILLA_ESTADO }).subscribe(
            data => {
                this.plantillas = data;
            },
            error => {
                this._util.alerts(error);
            }
        )
    }

    appControlsForm = new ValidParamForm(
        [{
            "nombreEncuesta": [{
                validator: "required",
            }]
        }, {
            "plantilla": [{
                validator: "required",
            }]

        },{
            "tipoProgramacion":[{
                validator:"required"
            }]
        },
        ,{
            "descripcion":[{
                validator:"maxlength",
                valor:'200'
            }]
        }]);


   public  setNombreProgramacion(plantilla: any) {
        if (plantilla) {
            let fecha: Date = new Date();
            let nombreProgramacion = this._utilString.concatenate(plantilla.nombre, this._utilString.OPEN_PARENTHESIS, String(fecha.getFullYear()),this._utilString.CLOSE_PARENTHESIS);
            this.form.patchValue({ nombreEncuesta: nombreProgramacion });
        }
    }

    public listarTipoProgramacion(){
        this._util.http({url:this._utilRutas.LISTAR_TIPO_PROGRAMACION,data:{}}).subscribe(
            data=>{
                this.tipoProgramacion = data;
            },
            error=>{
                this._util.alerts(error);
            }
        )
    }

}