import { Component, OnInit,Input,Output,EventEmitter,ViewChild,OnDestroy} from '@angular/core';
import * as _ from "lodash";
@Component({
  selector:'baHabilitarBotonCmp',
  templateUrl:'baHabilitarBoton.html'
})
export class BaHabilitarBotonCmp implements OnDestroy, OnInit{
    @Input() data: Array<any>;
    @Input() init: any;
    @Input() type: any;
    @Input() name: any;
    @Input() disabled: boolean = false;
    @Input() automatic: boolean = true;
    @Input() id:number;
    @Output() cbutton : EventEmitter<any>;

    mensaje: string;
    newStyle: string;
    private mensajeIndex: number = 0;
    constructor(){
        this.newStyle = '#8000ff';
        this.cbutton = new EventEmitter<any>();
    }
    ngOnInit() {
        if(this.init != undefined && this.init != null){
            this.iniciarEn(this.init);
        }
        else{
            if(this.data.length > 0){
                this.mensaje = this.data[0].mensaje;
                this.newStyle = this.data[0].color;
                this.mensajeIndex = 0;
            }
        }
       
    }
    ngOnDestroy(){
  	}
    cambiarEst(){
        if(this.automatic){
            if(this.data.length > 0){
                let aux = this.mensajeIndex + 1;
                if((aux) < this.data.length){
                    this.mensajeIndex = aux;
                }else{
                    this.mensajeIndex = 0;
                }
                this.mensaje = this.data[this.mensajeIndex].mensaje;
                this.newStyle = this.data[this.mensajeIndex].color;
            }
            this.cbutton.emit(this.data[this.mensajeIndex]);
        }
        
    }
    public iniciarEn(estadoIncial: any){
        let index = _.findIndex(this.data,o =>{
            return o.mensaje == estadoIncial.mensaje;
        });
        if(index != -1){
            this.mensajeIndex = index;
            this.mensaje = this.data[this.mensajeIndex].mensaje;
            this.newStyle = this.data[this.mensajeIndex].color;
        }
    }
    public getType(){
        return this.type;
    }
    public getId(): number {
        return this.id;
    }
    public getName(){
        return this.name;
    }
}