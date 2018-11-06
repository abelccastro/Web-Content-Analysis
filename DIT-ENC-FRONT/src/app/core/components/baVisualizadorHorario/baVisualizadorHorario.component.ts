import { Component, Input, OnInit, Output, EventEmitter,ViewChild,ChangeDetectionStrategy  } from '@angular/core';

export class TbSesion {
    segmentoInicial : number;
    segmentoFinal : number;
    horaInicio : String;
    activo : boolean;
    numSeg : number;
    asignable : boolean;
    sesion : any;
}

export class TbHorarioDia {
    dia : string; 
    sesiones: TbSesion[];
}

@Component({
    selector: 'ba-visualizador-horario',
    templateUrl: './baVisualizadorHorario.html',
    styleUrls: [ './baVisualizadorHorario.scss' ],
    changeDetection: ChangeDetectionStrategy.Default
})
export class BaVisualizadorHorarioCmp implements OnInit {

    //entradas
   @Input() asignaturaSeleccionada: any;
   @Input() horarioGrupo : any;
   @Input() confObject :  any;

   //salida
    @Output() seleccionCelda = new EventEmitter();
    @Output() eliminarObjetoCelda = new EventEmitter();

    //constante
    MINUTOS_POR_HORA  =  60;

    //propiedades
    clasesCursos: TbSesion[] = [];
    tbHorarioSemana : TbHorarioDia[] = null;
    celdaIndexSeleccionada = -1;
    tbHorarioDiaSeleccionada = null;
    marcadoresHora =  null;
    asignarHoraAmbienteConf = {
         "horasLectivas" : 1,
         "pabellon" : null,
         "ambiente" : null
     }

    parametrosCreacionObject:any;
    nuevaDisponibilidadObjectForm = {
        horaIncio : "",
        horaFin : "",
        horaFinHora : null,
        horaFinMinuto : null,
        codigoDia : ""
    }
    totalDeMinutos:number = 0;
    constructor() {
        
     }




    private calcularNumeroDeSegmentos(confObject) {
        let minutosHoraFinal = this.horaEnMinutos(confObject.horaFinalDia);
        let minutosHoraInicial = this.horaEnMinutos(confObject.horaInicioDia);
        return   (minutosHoraFinal - minutosHoraInicial)/confObject.divisionTiempo;
    }


    ngOnInit(): void {
        this.initConfig();
        this.marcadoresHora = this.generarIndicadorDeHoras();
        this.tbHorarioSemana = this.getGenerarCeldasPorDia(this.horarioGrupo.length);
        this.trasformarData(this.horarioGrupo);
    }

    private initConfig() {
        this.confObject.numeroDivPorHoraLectiva = this.confObject.duracionHoraLectiva / this.confObject.divisionTiempo;
        this.confObject.numeroDivisiones = this.calcularNumeroDeSegmentos(this.confObject);
    }
    
    private getGenerarCeldasPorDia(numeroDias) {
        this.totalDeMinutos = 0;
        let tbHorarioSemana : TbHorarioDia[] = [];
        for(let j:number = 0; j < numeroDias; j++) {
            let clasesCursosTemp: TbSesion[] = [];
            for(let i:number = 0; i < this.confObject.numeroDivisiones; i++) {
                let claseCursoTemp : TbSesion = {
                    "segmentoInicial" :  i,
                    "segmentoFinal" : i + 1,
                    "horaInicio" : "",
                    "activo" : false,
                    "numSeg" : 1,
                    "sesion" : null,
                    "asignable" : true
                }
                claseCursoTemp.horaInicio = this.getHoraDeNumeroSegmento(claseCursoTemp.segmentoInicial);
                clasesCursosTemp.push(claseCursoTemp);
            }
            let cursosPorDiaTemp : TbHorarioDia = {
                "dia" : this.getNombreDia(j),
                "sesiones" : clasesCursosTemp
            }
            tbHorarioSemana.push(cursosPorDiaTemp);
        }
        return tbHorarioSemana;
    }

    private seleccionarCelda(celdaIndex: number, diaIndex: number, $event): boolean {
        
        let horarioDia:TbHorarioDia = this.tbHorarioSemana[diaIndex];
        let tbSesion = horarioDia.sesiones[celdaIndex];

        //horaFinMaxima -> hora maxima que puede ocupar el objecto (sesiones, disponibilidades).
        let datosCelda =  null;
        if(tbSesion.activo == true) {
            datosCelda = {
                "ocupado" : true,
                "objeto" : tbSesion.sesion,
                "parametros" : {
                    "diaIndex" : diaIndex,
                    "celdaIndex" : celdaIndex
                }
            };
        } else {
            datosCelda = {
                "ocupado" : false,
                "parametros" : {
                    "codigoDia" : horarioDia.dia,
                    "horaInicio" : this.getHoraDeNumeroSegmento(tbSesion.segmentoInicial),
                    "horaFinMaxima" : this.calcularHoraFinMaxima(celdaIndex, horarioDia),
                    "celdaObjectAnterior": this.getCeldaObjectAnterior(celdaIndex, horarioDia),
                    "celdaObjectPosterior" : this.getCeldaObjectPosterior(celdaIndex, horarioDia),
                    "diaIndex" : diaIndex,
                    "celdaIndex" : celdaIndex
                }
            };
        }

        if(tbSesion.activo == true && $event.which === 3){
           this.eliminarObjectEvent(celdaIndex, diaIndex, $event);
        } else {
            this.seleccionCelda.emit(datosCelda);
        }
        
        //this.mostrarModalAgregar(parametros);
        return false;
    }

    private getHorarioDia(codigoDia):TbHorarioDia {
        for(var i=0; i < this.tbHorarioSemana.length; i++) {
            if(this.tbHorarioSemana[i].dia == codigoDia) {
                return this.tbHorarioSemana[i];
            }
        }
        return null;
    }

    private setTbSesionEnHorario(indexCeldaInicial:number, horarioDia : TbHorarioDia, tbSesion: TbSesion) : void {
        horarioDia.sesiones.splice(indexCeldaInicial, tbSesion.numSeg);
        horarioDia.sesiones.splice(indexCeldaInicial, 0, tbSesion);
        this.totalDeMinutos = Number(this.totalDeMinutos) + this.operacionHoras(tbSesion.sesion.horaFin,tbSesion.sesion.horaInicio,'-');
    }

    private trasformarData(horarioGrupo) {
        for(let i:number = 0; i < horarioGrupo.length; i++){
            let sesionesDia = horarioGrupo[i];
            this.pasarTbHorarioDia(sesionesDia, i);
        }
    }

    private pasarTbHorarioDia(horarioDia, indexDia) {
        for(let i:number =0; i < horarioDia.lDtoOutListarDisponibilidadPorDia.length; i++) {
            let session = horarioDia.lDtoOutListarDisponibilidadPorDia[i];
            let tbSesion:TbSesion = {
                "segmentoInicial" : this.getNumeroDeSegmentoDeHora(session.horaInicio),
                "segmentoFinal" : this.getNumeroDeSegmentoDeHora(session.horaFin),
                "horaInicio" : "",
                "activo" : true,
                "numSeg" : 0,
                "asignable" : false,
                "sesion" : session
            }
            tbSesion.horaInicio = this.getHoraDeNumeroSegmento(tbSesion.segmentoInicial);
            tbSesion.numSeg = tbSesion.segmentoFinal - tbSesion.segmentoInicial;
            tbSesion.sesion.horaInicio = this.getHoraDeNumeroSegmento(tbSesion.segmentoInicial);
            tbSesion.sesion.horaFin = this.getHoraDeNumeroSegmento(tbSesion.segmentoFinal);
            
            let celdaIndex = this.getIndexInsertar(this.tbHorarioSemana[indexDia].sesiones, tbSesion.segmentoInicial);
            this.setTbSesionEnHorario(celdaIndex, this.tbHorarioSemana[indexDia], tbSesion);
        }
    }

    private getIndexInsertar(tbSesiones, segmentoInicial) {
        let sumSegmentos = 0;
        for(let i:number = 0; i < tbSesiones.length; i++){
            sumSegmentos = sumSegmentos + tbSesiones[i].numSeg;
            if(segmentoInicial < sumSegmentos) {
                return i;
            }
        }
    }

    private getNumeroDeSegmentoDeHora(horaHmm) {
        let numeroMinutos = this.operacionHoras(horaHmm, this.confObject.horaInicioDia, "-");
        return numeroMinutos / this.confObject.divisionTiempo;
    }

    private getHoraDeNumeroSegmento(numeroDeSegmento) {
        let numeroDeMinutos = this.horaEnMinutos(this.confObject.horaInicioDia) + 
                              numeroDeSegmento * this.confObject.divisionTiempo;
        return  this.minutosEnHoras(numeroDeMinutos);
    }

    private operacionHoras(horaHmm1, horaHmm2, operador) {
        let minutosTiempo1 = this.horaEnMinutos(horaHmm1);
        let minutosTiempo2 = this.horaEnMinutos(horaHmm2);
        if(operador === '-'){
            return minutosTiempo1 - minutosTiempo2;
        }
    }

    private minutosEnHoras(minutos) {
        let numeroHoras = Math.floor(minutos / this.MINUTOS_POR_HORA);
        let cadenaHoras = numeroHoras.toString();
        if(cadenaHoras.length == 1) {
            cadenaHoras = "0" + cadenaHoras;
        }
        let restoMinutos = minutos % this.MINUTOS_POR_HORA;
        let cadenaRestoMinutos = restoMinutos.toString();
        if(cadenaRestoMinutos.length == 1) {
            cadenaRestoMinutos = "0" + cadenaRestoMinutos;
        }
        return cadenaHoras + ":" + cadenaRestoMinutos;
    }

    private horaEnMinutos(tiempo) {
        let tiempoArray = tiempo.split(":");
        return parseInt(tiempoArray[0]) * this.MINUTOS_POR_HORA + parseInt(tiempoArray[1]); 
    }

    private getNombreDia(index) {
        if(index === 0) return "LUN";
        if(index === 1) return "MAR";
        if(index === 2) return "MIE";
        if(index === 3) return "JUE";
        if(index === 4) return "VIE";
        if(index === 5) return "SAB";
        if(index === 6) return "DOM";
    }

    private getIndexDia(dia) {
        if(dia === "LUN") return 1;
        if(dia === "MAR") return 2;
        if(dia === "MIE") return 3;
        if(dia === "JUE") return 4;
        if(dia === "VIE") return 5;
        if(dia === "SAB") return 6;
        if(dia === "DOM") return 7;
    }

    /////////////
    private calcularHoraFinMaxima(celdaIndex, horarioDia : TbHorarioDia) {
        let celdas = horarioDia.sesiones;
        for(let i:number = celdaIndex; i < celdas.length; i++) {
            if(celdas[i].sesion != null) {
                return this.getHoraDeNumeroSegmento(celdas[i].segmentoInicial);
            }
        }
        return this.getHoraDeNumeroSegmento(celdas[celdas.length -1].segmentoFinal);
    }

    private getCeldaObjectAnterior(celdaIndex, horarioDia : TbHorarioDia) {
        let celdas = horarioDia.sesiones;
        for(let i:number = celdaIndex; i >=0; i--) {
            if(celdas[i].sesion != null){
                return celdas[i].sesion;
            }
        }
        return null;
    }

    private getCeldaObjectPosterior(celdaIndex, horarioDia : TbHorarioDia) {
        let celdas = horarioDia.sesiones;
        for(let i:number = celdaIndex; i < celdas.length; i++) {
            if(celdas[i].sesion != null) {
                return celdas[i].sesion;
            }
        }
        return null;
    }

    private generarIndicadorDeHoras() {
        let horaInicioDia = this.confObject.horaInicioDia.split(":")[0];
        let horaFinalDia = this.confObject.horaFinalDia.split(":")[0];
        let numeroDeHorasDia = Number(horaFinalDia) - Number(horaInicioDia);
        let horaInicioDiaEnMinutos =  this.horaEnMinutos(this.confObject.horaInicioDia);
        let marcadoresHora = [];
        for(let i:number = 0; i < numeroDeHorasDia; i++) {
            let marcador = {
                numSeg : this.confObject.numeroDivisiones / numeroDeHorasDia,
                hora : this.minutosEnHoras(horaInicioDiaEnMinutos + i * this.MINUTOS_POR_HORA)
            }
            marcadoresHora.push(marcador);
        }
        return marcadoresHora;
    }

    private eliminarObjectEvent(celdaIndex, diaIndex, $event){
        event.stopPropagation();
        let horarioDia:TbHorarioDia = this.tbHorarioSemana[diaIndex];
        let tbSesion = horarioDia.sesiones[celdaIndex];
        if(tbSesion.sesion == null) return false;
        //horaFinMaxima -> hora maxima que puede ocupar el objecto (sesiones, disponibilidades).
        let datosCelda =  null;
        datosCelda = {
            "ocupado" : true,
            "objeto" : tbSesion.sesion,
            "parametros" : {
                "diaIndex" : diaIndex,
                "celdaIndex" : celdaIndex
            }
        };
        this.eliminarObjetoCelda.emit(datosCelda);
        return false;
    }



    private encontrarIndexCelda(objeto, horarioDia) {
        let celda:TbSesion = null;
        for(let i:number =0; i < horarioDia.sesiones.length; i++) {
            celda = horarioDia.sesiones[i];
            if(celda.activo == true && celda.sesion.horaInicio == objeto.horaInicio) {
                return i;
            }
        }
    }

    private getClassSesion(tbSesion:TbSesion) {
        let classArray = [];
        let clases;
        if( tbSesion.sesion != null ) {
            let numberClassSession = tbSesion.sesion.numberclassSession;
            let esValido = this.esValidoNumeroDeClaseSesion(numberClassSession);
            if(esValido) {
                classArray.push("sesion" + numberClassSession);
            } else {
                classArray.push("sesion");
            }
        } 
        if(this.asignaturaSeleccionada != null && tbSesion.asignable  && !tbSesion.sesion != null){
            classArray.push("asignable");
        }

        if(tbSesion.segmentoInicial % (this.MINUTOS_POR_HORA / this.confObject.divisionTiempo) == 0){
            classArray.push("divHora");
        }
        return classArray;
        
    }

    private esValidoNumeroDeClaseSesion(numberClassSession) {
        let esValido = false;
        switch(numberClassSession){
            case 1: {
            esValido = true;
               break; 
            }
            case 2: {
                esValido = true;
                break;
            }
            case 3: {
                esValido = true;
              break;  
            }
            case 4: {
                esValido = true;
                break;
            }
            case 5: {
                esValido = true;
                break;
            }
            default: {
                esValido = false;
                break; 
            } 
        }
        return esValido;
    }

    private getValueDia(dia) {
        if(dia === "LUN") return "Lunes";
        if(dia === "MAR") return "Martes";
        if(dia === "MIE") return "Miércoles";
        if(dia === "JUE") return "Jueves";
        if(dia === "VIE") return "Viernes";
        if(dia === "SAB") return "Sábado";
        if(dia === "DOM") return "Domingo";
    }

    //metodos publicos.
    public agregarObjectoATabla(objeto) {
        let tbSesion : TbSesion = {
            'segmentoInicial' : this.getNumeroDeSegmentoDeHora(objeto.horaInicio),
            'segmentoFinal' : this.getNumeroDeSegmentoDeHora(objeto.horaFin),
            'horaInicio' : "",
            'activo' : true,
            'numSeg' : null,
            'asignable' : false,
            'sesion' : objeto
        }
        tbSesion.horaInicio = this.getHoraDeNumeroSegmento(tbSesion.segmentoInicial);
        tbSesion.numSeg = tbSesion.segmentoFinal - tbSesion.segmentoInicial;
        let horarioDia:TbHorarioDia  = this.getHorarioDia(objeto.codigoDia);
        let indexCeldaInicial = this.getIndexInsertar(horarioDia.sesiones, tbSesion.segmentoInicial);
        this.setTbSesionEnHorario(indexCeldaInicial, horarioDia, tbSesion);
        return true;
    }

    public pasarDataAHorario(listObjetosDia) {
        this.tbHorarioSemana = this.getGenerarCeldasPorDia(listObjetosDia.length);
        this.trasformarData(listObjetosDia);
    }

    public getTotalHorasCronologicas() {
        return {
            horas : Math.floor(this.totalDeMinutos / this.MINUTOS_POR_HORA),
            minutos : this.totalDeMinutos % this.MINUTOS_POR_HORA
        };
    }

    public eliminarObjetoEnTabla(diaIndex, celdaIndex) {
        let horarioDia = this.tbHorarioSemana[diaIndex];
        let tbSesion = horarioDia.sesiones[celdaIndex];
        let numeroDeSegmentos = tbSesion.numSeg;
        let segmentoInicial = tbSesion.segmentoInicial;
        horarioDia.sesiones.splice(celdaIndex, 1);
        for (let i:number = 0; i < numeroDeSegmentos; i++) {
            let tbSesion : TbSesion = {
                "segmentoInicial" : segmentoInicial + i,
                "segmentoFinal" : segmentoInicial + i + 1,
                "horaInicio" : "",
                "activo" : false,
                "numSeg" : 1,
                "asignable" : true,
                "sesion" : null
            }
            tbSesion.horaInicio = this.getHoraDeNumeroSegmento(tbSesion.segmentoInicial);
            horarioDia.sesiones.splice(celdaIndex+i, 0, tbSesion);
        }
        this.totalDeMinutos = Number(this.totalDeMinutos) - this.operacionHoras(tbSesion.sesion.horaFin,tbSesion.sesion.horaInicio,'-');
    }

}
