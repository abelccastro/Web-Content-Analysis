import { Directive, ElementRef, Renderer,  HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor, ControlValueAccessor } from '@angular/forms';

@Directive({ selector: '[hidden]' })
export class BaHidden {
  /**
   * Creates an instance of BaHidden.
   *
   * @param {Renderer} _renderer
   * @param {ElementRef} _elementRef
   *
   * @memberOf BaHidden
   */
  constructor(el: ElementRef, renderer: Renderer) {
      renderer.setElementStyle(el.nativeElement, 'display', 'none');
  }
}

const UPPERCASE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BaTrim),
  multi: true
};

@Directive({
  selector : '[trim]',
  providers: [ UPPERCASE_VALUE_ACCESSOR ]
})

export class BaTrim implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};
  registerOnChange(fn: (value: any) => any): void { this.onChange = fn; }
  registerOnTouched(fn: () => any): void { this.onTouched = fn; }
  writeValue() {}
  private _el: HTMLInputElement;

  /**
   * Creates an instance of BaTrim.
   *
   * @param {Renderer} _renderer
   * @param {ElementRef} _elementRef
   *
   * @memberOf BaTrim
   */
  constructor ( private _renderer: Renderer, private _elementRef: ElementRef ) {
    this._el = _elementRef.nativeElement;
  }

  @HostListener( 'input', ['$event.target.value'] )
  updateValue (value: string): void {
    this._el.value = this.trimDuplicateSpaceValue(value);
  }

  /**
   * Remove all space duplicate of string
   * 
   * @private
   * @param {string} value - value
   * 
   * @memberOf BaTrim
   */
  private trimDuplicateSpaceValue( value: string ):string {
    return value.replace(/\s+/g, ' ');
  }

  /*@HostListener( 'blur', [ '$event.target.value' ] )
  onBlur ( value: string ): void {
    this.trimValue( value );
  }*/

  /*spaceKey:boolean = false;
  @HostListener('document:keydown', ['$event'])
  keyboardInput(event: any) {
    if(event.keyCode == 32 || event.code == 'Space'){
      this.spaceKey = true;
    }
    else {
      this.spaceKey = false;
    }
  }*/
}

