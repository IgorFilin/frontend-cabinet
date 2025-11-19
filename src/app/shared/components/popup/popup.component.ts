import { Component, input, OnInit, Signal, WritableSignal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'app-popup',
  imports: [IconComponent],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  title: Signal<string> = input('');
  description: Signal<string> = input('');
  buttons: Signal<{ text: string; action: () => {} }[]> = input([]);

  constructor(private popupService: PopupService) {}

  ngOnInit() {}

  close() {
    this.popupService.close();
  }
}
