import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { slideInOutAnimation } from '../../animations/slide-in-out.animations';

@Component({
  selector: 'cabinet-main',
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [slideInOutAnimation],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {}
}
