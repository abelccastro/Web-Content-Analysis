import {Pipe,PipeTransform} from '@angular/core';

@Pipe({ name: 'baAutoComplete'})
export class BaAutoCompletePipe implements PipeTransform{
    transform(value: Object, positions: string[] = []): string{
        let rpta: string = '';
        if(positions.length === 0){
            for(let key in value){
                if(value.hasOwnProperty(key)){
                    rpta += String(value[key]) + ' ';
                }
            }
        }else{
            positions.forEach(key => {
                if(value.hasOwnProperty(key)){
                    rpta += String(value[key]) + ' ';
                }
            });
        }
        return rpta;
    }
}