import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiBaseUrl;

  if (req.url.startsWith('http') || req.url.startsWith('https')) {
    const uriPath = req.url.split('/').splice(3).join('/');

    const newReq = req.clone({
      url: `${apiUrl}/${uriPath}`,
    });

    return next(newReq);
  }

  return next(
    req.clone({
      url: `${apiUrl}/${req.url}`,
    })
  );
};
