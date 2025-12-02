/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonCustomComponent } from './radio-button-custom.component';

describe('RadioButtonCustomComponent', () => {
  let component: RadioButtonCustomComponent;
  let fixture: ComponentFixture<RadioButtonCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonCustomComponent] // ← заменено declarations → imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // ← исправлена опечатка
  });
});