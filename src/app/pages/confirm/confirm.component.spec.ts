import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmComponent }  from './confirm.component';
import { ActivatedRoute }    from '@angular/router';
import { of }                from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmComponent],
      providers: [
        provideNoopAnimations(), // ← добавлено!
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: { get: () => null },
              queryParamMap: { get: (key: string) => null }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});