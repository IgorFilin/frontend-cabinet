import { ChangeDetectorRef, Component, Input, Optional, Self, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { FormErrorHandlerComponent } from '../form-error-handler/form-error-handler.component';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    imports: [FormsModule, FormErrorHandlerComponent]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() type: string = 'email';
  @Input() errorMessage: string = '';
  value: string = '';
  onTouch(isTouch: boolean) {}
  onChange(value: string) {}

  constructor(
    @Self() @Optional() private control: NgControl,
    private changeDetector: ChangeDetectorRef
  ) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  get invalid(): boolean | null {
    return this.control ? this.control.invalid : false;
  }

  public get showError(): boolean | null {
    if (!this.control) return false;
    const { dirty, touched } = this.control;
    return this.invalid ? dirty || touched : false;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
    
  handleBlur(): void {
    this.onTouch(true);
  }

  onChangeHandler(event: Event) {
    const value = (event.currentTarget as HTMLInputElement).value;
    this.onTouch(true);
    this.onChange(value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!control.valid) return null;
    return {
      mustBePositive: {
        value,
      },
    };
  }
}
