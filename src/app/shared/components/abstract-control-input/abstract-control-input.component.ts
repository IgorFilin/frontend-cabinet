import { Component, forwardRef, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
    template: '',
    selector: 'app-abstract-control',
    standalone: false
})
export abstract class AbstractControlComponent implements ControlValueAccessor {

  onChange!: (value: string) => void;
  onTouched!: () => void;

  value: string = '';
  
  constructor(@Self() @Optional() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
