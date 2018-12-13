import { Observable, Subject } from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class BaAutoCompleteService {
    private queryAutoCompleteSource: Subject<string> = new Subject<string>();
    private _queryAutoComplete:Observable<string> = this.queryAutoCompleteSource.asObservable();

    private filterAutoCompleteSource: Subject<Array<Object>> = new Subject<Array<Object>>();
    private _filterAutoComplete: Observable<Array<Object>> = this.filterAutoCompleteSource.asObservable();

    public setQueryAutoComplete(query: string){
        this.queryAutoCompleteSource.next(query);
    }
    public getQueryAutoComplete(){
        return this._queryAutoComplete;
    }
    public setFilterAutoComplete(filter: Array<Object>){
        this.filterAutoCompleteSource.next(filter);
    }
    public getFilterAutoComplete(){
        return this._filterAutoComplete;
    }
}