import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ver-resultado]',
})
export class ResultadoDocVerDirectiva {
  constructor(public viewContainerRef: ViewContainerRef) { }
}