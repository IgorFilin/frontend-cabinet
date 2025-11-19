import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appEventOutsideElement]'
})
export class EventOutsideElementDirective {

  @Output() documentMousedown = new EventEmitter<MouseEvent>();

  @HostListener('document:mouseup', ['$event'])
    onMousedown(event: MouseEvent) {
      this.documentMousedown.emit(event);
    }
}
