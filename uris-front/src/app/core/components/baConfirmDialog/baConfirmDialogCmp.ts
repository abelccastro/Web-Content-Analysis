import { Title } from '@angular/platform-browser';
import { Component, OnInit,Output,EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { ModalOptions } from 'ng2-bootstrap';

export enum OPTIONS_MODAL { OK = 1, CANCEL}
@Component({
    selector: 'baConfirmDialogCmp',
    templateUrl: 'baConfirmDialog.html'
})
export class BaConfirmDialogCmp implements OnInit{
    private title;
    private message;
    private ok: Function;
    private cancel: Function;
    @ViewChild(ModalDirective) private dialog: ModalDirective;
        
    constructor(){}
    ngOnInit(){}

    public openModal(data: any = {title:'',message:''}): Promise<OPTIONS_MODAL>{
        return new Promise<any>((resolve, reject) => {
            this.title = data.title;
            this.message = data.message;
            this.dialog.show();
            this.yes = () => {                
                resolve(OPTIONS_MODAL.OK);
            }
            this.no = () => {
                this.close();
                resolve(OPTIONS_MODAL.CANCEL);
            }
        });
    }
    public close(){
        this.dialog.hide();
    }
    private yes(): void{}
    private no(): void{}

}