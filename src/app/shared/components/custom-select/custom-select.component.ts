import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControlComponent } from '../abstract-control-input/abstract-control-input.component';
import { bubbleAnimation } from '../../../animations/bubble.animation';

@Component({
  standalone: true,
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  animations: [bubbleAnimation],
})
export class CustomSelectComponent extends AbstractControlComponent implements OnInit  {

  @Input() values: string[] = [];
  @Input() title: string = ''
  currentValue: string = this.value
  toggleSelect: boolean = false

  ngOnInit() {
    console.log(this.value);
  }

  onChangeClickItemHandler(value:string) {
    this.value = value
    this.onChange(value); 
  }

  onBlurHandler() {
    this.onTouched();
    this.toggleSelect = false
  }
}
