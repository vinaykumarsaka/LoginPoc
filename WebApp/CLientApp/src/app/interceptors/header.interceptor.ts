import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    });

  //  Adding extra attributes
  //   const authReq = request.clone({
  //     headers: request.headers.set('Content-Type', 'application/json')
  //     .set('header2', 'header 2 value')
  //     .set('header3', 'header 3 value')
  // });
    return next.handle(authReq);
  }
}
