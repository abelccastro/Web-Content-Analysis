import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'baKeys',  pure: false
})
export class BaKeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)
    }
}