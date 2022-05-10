import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable()
export class InterInterceptor implements HttpInterceptor {

  token: any;

  constructor(private loginService:ApiService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = JSON.parse(localStorage.getItem("token")!)
    console.log(this.token);
    
    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('auth-token', this.token) });
      return next.handle(tokenizedReq)
    }
    return next.handle(req);
  }
}
