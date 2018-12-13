import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Util } from '../../index';

@Component({
	selector: 'baFileUploaderCmp',
	templateUrl: 'baFileUploader.html'
})
export class BaFileUploaderCmp {
	@ViewChild('myInput') myInput: any;
	@Input() extensiones: string;
	@Input() url: string;
	@Input() maxTamanio: number;
	@Input() data: Object;
	@Output() successEvent: EventEmitter<any>;
	@Input() nameFile: string = 'Importar';
	constructor(private _util: Util) { 
		this.successEvent = new EventEmitter<any>();
	}
	
	onChange(event) {
		let fileList = event.srcElement.files;
		if(fileList.length > 0) {
			let file: File = fileList[0];
			if(this.extensiones.indexOf(this.obtenerExtensionArchivo(file.name)) !== -1 ) {
				let formData = new FormData();
				formData.append('file', file);
				if(this.data && this.data instanceof Object){
					for(let key in this.data){
						if(this.data.hasOwnProperty(key)){
							let value = this.data[key];
							if(!(value instanceof Object)){
								formData.append(String(key),String(value));
							}
						}
					}
				}
				if(this.maxTamanio > file.size) {
					this._util.http({ url:this.url, data:formData, file:true, json:false}).subscribe( res => {
						this.successEvent.emit();
						this._util.alerts(res);
					});					
				} else {
					let msg = { 'tipo' : 'warning', 'mensaje' : 'Tamanio de archivo excede el limite'};
					this._util.alerts(msg);
				}				
			} else {
				let msg = { 'tipo' : 'warning', 'mensaje' : 'Archivo no permitido'};
				this._util.alerts(msg);
			}
			this.reset();
		}
	}
	reset(){
		this.myInput.nativeElement.value = "";
	}
	obtenerExtensionArchivo(nombreArchivo : string) : string {
		let partes = nombreArchivo.split('.');
		if(partes.length > 0) {
			return partes[partes.length-1];
		}
		return "unknown";
	}
	public setData(data: any){
		this.data = data;
	}
}