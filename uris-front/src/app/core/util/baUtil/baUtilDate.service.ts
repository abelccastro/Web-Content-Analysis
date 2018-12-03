import {Injectable} from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaUtilNumber} from './baUtilNumber.service';
import { BaUtilString} from './baUtilString.service';

@Injectable()
export class BaUtilDate {
    constructor(private datepipe: DatePipe,
        private _utilnumber: BaUtilNumber, private _utilstring: BaUtilString){}

    
    /**
     * Metodo para obtener el objeto date de una fecha en un formato especifico
     * @param {string} strDate - Cadena con la fecha
     * @param {string} format  - Cadena que tiene el formato de la fecha (dd-MM-yyyy,dd/MM/yyyy)
     * @return {Date} -Objeto date producto de leer la fecha en el formato indicado
     * @author gmorales <geanmorales@gmail.com>
     */
    public convertDate(strDate: string, format: string): Date{
        let objDate: Date = new Date();
        return this.getDateFromFormat(strDate,format);
    }
    /**
     * Metodo para obtener la  date de una fecha en un formato especifico
     * @param {Date} dd - Fecha que se quiere parsear
     * @param {string} format  - Cadena que tiene el formato de la fecha (dd-MM-yyyy,dd/MM/yyyy)
     * @return {string} - cadena con el formato de fecha indicado
     * @author gmorales <geanmorales@gmail.com>
     */
    public formatDate(dd: Date, format: string): string {
        let strDate: string = this.datepipe.transform(dd,format);
        return strDate;
    }


    private getDateFromFormat(strDate: string, format: string): Date {

        let year: number;
        let month: number;
        let day: number;
        for(let i = 0; i < format.length; i++){
            let pos:number = this.getElementDate(format,i);
            let elementFormat: string = this._utilstring.subString(format,i,pos);
            let element: string =  this._utilstring.subString(strDate,i,i + elementFormat.length);
            if(elementFormat === 'yyyy' || elementFormat == 'yy'){
                year = Number(element);
            }
            else if(elementFormat === 'dd' || elementFormat == 'DD'){
                day = Number(element);

            }else if(elementFormat == 'MM'){
                month = Number(element);
            }
            i = pos;
        }
        let rpta: Date = new Date();
        rpta.setDate(day);
        rpta.setFullYear(year);
        rpta.setMonth(month-1);
        return rpta;
    }
    private getElementDate(strDate: string, start: number): number{
        let character: string = strDate.charAt(start);
        let end: number = start;
        while(!this.isEspecialCharacter(character)){
             end += 1;
             character = strDate.charAt(end);
        }
        return end;
    }
    private isEspecialCharacter(character: string): boolean{
        let str: string = '/- .T:';
        return str.indexOf(character) == this._utilnumber.NUMBER_ONE_NEGATIVE ? false : true;
    }
}