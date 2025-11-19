import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'cabinet-icon',
    imports: [CommonModule],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() color: string = '';
  @Input() id!: string;
  @Input() disabled: boolean = false;
  @Output() iconClick = new EventEmitter<void>();
  
  onClickHandler(event: MouseEvent) {
   event.stopPropagation()
   
   if(!this.disabled) {
     this.iconClick.emit();
   }
  }
}
