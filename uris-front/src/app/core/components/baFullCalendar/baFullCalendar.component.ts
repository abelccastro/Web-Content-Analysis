import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import 'fullcalendar/dist/fullcalendar.js';

import 'style-loader!./baFullCalendar.scss';

@Component({
  selector: 'ba-full-calendar',
  templateUrl: './baFullCalendar.html',
})
export class BaFullCalendar {

  @Input() baFullCalendarConfiguration:Object;
  @Input() baFullCalendarClass:string;
  @Input() baFullCalendarRenderEvents:any[] = [];

  @Output() onCalendarReady = new EventEmitter<any>();
  @Output() onSelectedDay = new EventEmitter<any>();
  @ViewChild('baFullCalendar') public _selector:ElementRef;

  ngAfterViewInit() {
    this.baFullCalendarConfiguration['dayClick'] = (event: any)=>{
      this.onSelectedDay.emit(event._d);  
    }
    let calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration);
    this.baFullCalendarRenderEvents.forEach( event => {
      jQuery(this._selector.nativeElement).fullCalendar('renderEvent',event);
    });
    
    this.onCalendarReady.emit(calendar);
  }
}
