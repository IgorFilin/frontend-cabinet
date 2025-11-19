import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ValidationErrors } from '@angular/forms';
import { FormErrorHandlerComponent } from '../form-error-handler/form-error-handler.component';
import { debounceTime, distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { bubbleAnimation } from '../../../animations/bubble.animation';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  imports: [FormsModule, FormErrorHandlerComponent, IconComponent],
  animations: [bubbleAnimation],
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() isIcon: boolean = true;
  @Input() searchedRequest: ((value: string) => Observable<any> | undefined) | null = null;
  @Output() onSelectTag = new EventEmitter<string>();
  searchData: Array<any> = [];
  isLoadingData: boolean = false;
  value: string = '';
  valueSubject = new Subject();

  onTouch(isTouch: boolean) {}
  onChange(value: string) {}

  constructor(@Self() @Optional() private control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.valueSubject
      .asObservable()
      .pipe(
        tap(() => {
          this.isLoadingData = true;
        }),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((res) => {
        const valueSearch: string = res as string;
        if (!this.searchedRequest) return;

        if (this.searchedRequest(valueSearch) instanceof Observable) {
          this.searchedRequest(valueSearch)!.subscribe((res) => {
            this.searchData = res;
            this.isLoadingData = false;
          });
        } else {
          this.searchedRequest(valueSearch);
          this.isLoadingData = false;
        }
      });
  }

  onSelectTagHandler(tag: string) {
    this.onSelectTag.emit(tag);
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
    this.searchData = [];
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
    this.value = value;
    this.onChange(value);
    this.valueSubject.next(value);
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
