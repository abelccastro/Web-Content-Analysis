import {Injectable} from '@angular/core';

@Injectable()
export class BaUtilCollections {
    constructor(){}

    public  isEmptyArray(list: Array<any>): boolean {
        return list === null || list.length === 0;
    }
    public  firsElement(list: Array<any>): any {
        let first: any = null;
        if(!this.isEmptyArray(list)){
            first = list[0];
        }
        return first;
    }
    public filterArray(list: Array<any>, filter: Function): Array<any>{
        let result: Array<any> = new Array<any>();
        result = list.map(filter.apply);
        return result;
    }
}