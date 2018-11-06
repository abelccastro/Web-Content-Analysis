import { Component, Input, ViewChild, Self, forwardRef } from '@angular/core';
import { NgModel,ControlValueAccessor,NG_VALUE_ACCESSOR	 } from '@angular/forms';

import { BaUtilFile } from '../../util/baUtil/baUtilFile.service';
import { BaUtilNumber } from '../../util/baUtil/baUtilNumber.service';
import { BaUtilString } from '../../util/baUtil/baUtilString.service';
import { Util } from '../../util/util';

@Component({
    selector: 'ba-input-file[ngModel]',
	templateUrl: './baInputFile.html',
	providers:[NgModel]
})
export class BaInputFile implements ControlValueAccessor {

	@Input() extensions: string = '.pdf';
	@Input() maxFileSize: number = 90088;

	@ViewChild('myInputFile') private myInput: any;
	private fileName: string;
	private file: File;

	private TIPE_WARNING: string = 'warning';
	private MESSAGE_EXCEED_SIZE: string = 'Archivo muy pesado';
	private MESSAGE_FAIL_EXTENSION: string = 'Archivo no permitido';
	private APPEND_FORM_DATA: string = 'file';
	
	public model: NgModel;
	constructor(private _utilFile: BaUtilFile, private _utiString: BaUtilString,
		private _utilNumber: BaUtilNumber, private _util: Util, @Self() state: NgModel){

		this.model = state;
    	state.valueAccessor = this;
	}

	public onTouch(value: any): void {}
	public onChange(value: any): void {}
	public writeValue(file: File): void {
		this.file = file;
	}
	public registerOnChange(fn: any): void {
		this.onChange = (dataFile: any) => {
			let fileList = dataFile.srcElement.files;
			if(fileList.length > this._utilNumber.NUMBER_ZERO) {
				let auxFile: File = fileList[this._utilNumber.NUMBER_ZERO];
				if(this.extensions.indexOf(this._utilFile.getExtencionNameFile(auxFile.name)) !== this._utilNumber.NUMBER_ONE_NEGATIVE ) {
					if(this.maxFileSize > auxFile.size) {
						this.fileName = auxFile.name;
						this.writeValue(auxFile);
						this.model.viewToModelUpdate(auxFile);
					} else {
						let msg = { tipo : this.TIPE_WARNING, mensaje : this.MESSAGE_EXCEED_SIZE};
						this._util.alerts(msg);
					}				
				} else {
					let msg = { tipo : this.TIPE_WARNING, mensaje : this.MESSAGE_FAIL_EXTENSION};
					this._util.alerts(msg);
				}
				this.reset();
			}
		}
	}
	public registerOnTouched(fn: any): void { this.onTouch = fn; }
    reset(){
		this.myInput.nativeElement.value = this._utiString.EMPTY;
	}
    
}