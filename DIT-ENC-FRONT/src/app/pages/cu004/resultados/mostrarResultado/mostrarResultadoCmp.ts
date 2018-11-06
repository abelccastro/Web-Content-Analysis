import { Component, OnInit, OnDestroy,ViewChild, ComponentFactoryResolver, forwardRef,Type} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Util } from '../../../../app.index';
import {BaUtilDate} from '../../../../core/util/baUtil/index';
import { FormControl } from '@angular/forms/src/model';
import {UtilConstRutas } from "../_constantes/utilConstRutas";

@Component({
	selector: 'mostrarResultado',
	templateUrl: './mostrarResultado.html'
})

export class MostrarResultadoCmp{

	private titulo: string= 'Resultados estadísticos';
    private idProgramacionEvaluacion:number;
    private resultado : any = {};

    private  options= {
        fullWidth: true,
        height: '300px',
        low: 0,
        showArea:true,
        startAngle: 270,
        labelInterpolationFnc: function(value) {
            return Math.round(value * 100) + '%';
          }
    }

    private graficos = [];
    
    constructor(private _utilRutas:UtilConstRutas, private _util:Util, private _utilDate:BaUtilDate, private _route : ActivatedRoute){

    }

    ngOnInit(){
        this._route.params.subscribe(params =>{
			this.idProgramacionEvaluacion= params['id'];
			this.consultarResultadoPorProgramacionEvaluacion();
		});

    }

    public consultarResultadoPorProgramacionEvaluacion(){
        let dto = {
            id: this.idProgramacionEvaluacion
        }

        this._util.http({url:this._utilRutas.CONSULTAR_RESULTADO_PROGRAMACION_EVALUACION,data:dto}).subscribe(
            data=>{
                this.formatear(data)
                this.prepareData();
            },
            error=>{
                this._util.alerts(error);
            }
        )
    }

    public  prepareData(){
        let preguntas = this.resultado.preguntas;
        for(let i = 0; i<preguntas.length;i++){

            let barData = {
                labels:[],
                series:[[]]
            }

            let pieData = {
                labels:[],
                series:[]
            }

            let opciones = preguntas[i].opciones;
            
            let conteoTotal:number= 0;

            for (let j = 0; j<opciones.length;j++){
                pieData.labels.push(opciones[j].nombre);
                pieData.series.push(opciones[j].conteo);
                barData.labels.push(opciones[j].nombre);
                barData.series[0].push(opciones[j].conteo);
                conteoTotal+= opciones[j].conteo
            }
            preguntas[i].conteoTotal = conteoTotal;

            let grafico = {
                enunciado:preguntas[i].enunciado,
                tipo:'pie',
                bar:{
                    data:barData
                },
                pie:{
                    data:pieData
                }
            }
            this.graficos.push(grafico);   
        }
    }

    public formatear( data){
        this.resultado = data;
        this.resultado.fechaInicio = this._utilDate.formatDate(this.resultado.fechaInicio,'dd-MM-yyyy');
        this.resultado.fechaFin = this._utilDate.formatDate(this.resultado.fechaFin,'dd-MM-yyyy');
    }

    public establecerGrafico(grafico:any, tipo:string){
        console.log(grafico);
        grafico.tipo =tipo
        console.log(this.graficos);
    }

}

