import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaUtilFile {
    constructor(){}

    
    /**
     * Metodo para comvertir un blob en un archivo base 64
     * @param {any} data - Data a convertir, esta debe estar en un flujo de bytes o Blob
     * @param {string} contentType - cadena que representa el tipo de archivo que se quiere convertir
     * @return {Promise} - promesa con la cadena en base64
     * @author gmorales <geanmorales@gmail.com>
     */
    public blobToBase64(data: any, contentType: string): Promise<string> {
        return new Promise( (resolve, reject) => {
            let myBlob = new Blob([data],{type:contentType});
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(myBlob);
            reader.onloadend = () => {
                let b64 = reader.result;
                resolve(b64);
            }
        });
    }
    /**
     * Metodo para comvertir un string base 64 a Blob
     * @param {string} b64Data - Cadena que sera convertida debe estar en base64
     * @param {string} contentType - cadena que representa el tipo de archivo que se quiere convertir
     * @param {string} contentType - cadena que representa el tipo de archivo que se quiere convertir
     * @return {Promise} - promesa con la cadena en base64
     * @author gmorales <geanmorales@gmail.com>
     */
    public base64ToBlob(b64Data: string,contentType:string, sliceSize?: number): Blob{
        sliceSize = sliceSize || 512;
        let byteCharacters:string = atob(b64Data);
        let byteArrays:Uint8Array[] = [];

        for(let i = 0; i < byteCharacters.length; i += sliceSize){
            let slice:string = byteCharacters.slice(i,i + sliceSize);

            let byteNumbers: number[] = [];
            for(let j = 0; j < slice.length; j++){
                byteNumbers[j] = slice.charCodeAt(j);
            }
            let byteArray: Uint8Array = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        let blob: Blob = new Blob(byteArrays,{type:contentType});
        return blob;
    }
    public getExtencionNameFile(nameFile : string) : string {
		let parts = nameFile.split('.');
		if(parts.length > 0) {
			return parts[parts.length-1];
		}
		return "unknown";
	}
}