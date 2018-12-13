import { Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'ba-pdf-viewer',
    templateUrl: './baPdfViewer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaPdfViewer{

    @Input() src: any;
    @Input() height: number;
    @Input() width: string;
    constructor(){}
}