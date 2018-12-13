import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import {BaAutoCompleteService} from '../../services/index';
import {BaAutoCompletePipe} from '../../pipes/index';
import { Subscription } from 'rxjs/Rx';
import * as _ from "lodash";
const JUMP_FACTOR_AUTO_COMPLETE:number = 2;
@Component({
    selector:'ba-autocomplete',
    templateUrl:'./baAutocomplete.html',
    styleUrls:['./baAutocomplete.scss'],
    providers:[BaAutoCompletePipe]
})
export class BaAutoComplete implements OnInit,OnDestroy{

    @Input() private positions: string[] = [];
    @Output('itemSelect') private itemSelectChange: EventEmitter<Object>;
    private filteredList: Array<Object> = [];
    private query: string = "";
    private currentJump = 1;
    private subFilter: Subscription;  

    constructor(private elementRef: ElementRef,private _baAutoComplete: BaAutoCompleteService, private _pipeAutoComplete: BaAutoCompletePipe){
        console.log('elementRef',elementRef.nativeElement.parentElement);
        this.itemSelectChange = new EventEmitter<Object>();
    }
    ngOnInit(){
        this.subFilter = this._baAutoComplete.getFilterAutoComplete().subscribe(data=>{
            this.filteredList = _.clone(data);
            if(this.filteredList instanceof Array){
                this.filteredList.forEach(item => {
                    if(item instanceof Object){
                        let text = this._pipeAutoComplete.transform(item,this.positions);
                        item['text'] = text;
                    }
                });
            }
        });
    }
    ngOnDestroy(){
        this.subFilter.unsubscribe();
    }
    private filter(event: KeyboardEvent){
        if(this.query.length == 0) {
            this.reset();
            return;
        }
        if(event.keyCode == 8){
            if(this.currentJump > 1)
                this.currentJump -= 1;
        }
        if(this.query.length > (JUMP_FACTOR_AUTO_COMPLETE * this.currentJump)) {
            this.currentJump += 1; 
            this._baAutoComplete.setQueryAutoComplete(this.query);
        }
        
    }
    private reset(){
        this.filteredList = [];
        this.currentJump = 1;
    }
    private selectElement(item: Object){
        this.query = item['text'];
        let itemSelect = _.clone(item);
        delete itemSelect['text'];
        this.reset();
        this.itemSelectChange.emit(itemSelect);
    }
}
