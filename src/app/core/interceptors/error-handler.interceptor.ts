import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToasterService } from '../../services/toaster.service';
import { inject } from '@angular/core';
import { ERRORS_MESSAGE } from '../../shared/models';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toasterService = inject(ToasterService);
  return next(req).pipe(
    catchError((error) => {
      const errorMessage = error.error.message;
      toasterService.error(errorMessage || ERRORS_MESSAGE.OTHER_ERROR);
      return throwError(() => error);
    })
  );
};
