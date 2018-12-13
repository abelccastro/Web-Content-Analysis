import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app.config';

@Injectable()
export class BaThemeSpinner {

  private _selector:string = 'preloader';
  private _element:HTMLElement;
  private _timer:any;

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  public show():void {
    this._element.style['display'] = 'block';
  }

  public showIn():void {
    this._element.style['opacity'] = '0.4';
    this._element.style['display'] = 'block';
    //this.valTime();
  }

  public hide(delay:number = 0):void {
    if(delay === 0){
      this.clsTime();
    }else {
        this._timer = setTimeout(() => {
          this._element.style['display'] = 'none';
        }, delay);
    }    
  }

  private valTime() {
    this._timer = setTimeout(() => {
        this._element.style['display'] = 'none';
      }, AppConfig.TIMER_LOADER);
  }

  private clsTime() {
    this._element.style['display'] = 'none';
    clearTimeout(this._timer);
  }
}
