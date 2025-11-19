import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, takeLast } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsOpenCloseService {
  dataToggleElements$ = new BehaviorSubject<Record<string, boolean>>({});

  constructor() {}

  toggle(element: string) {
    if (!this.dataToggleElements$.value.hasOwnProperty(element)) {
      this.dataToggleElements$.next({
        ...this.dataToggleElements$.value,
        [element]: true,
      });
    } else {
      this.dataToggleElements$.next({
        ...this.dataToggleElements$.value,
        [element]: !this.dataToggleElements$.value[element],
      });
    }
  }

  get dataToggle(): Observable<any> {
    return this.dataToggleElements$.asObservable();
  }

  reset() {
    this.dataToggleElements$.next({});
  }

}
