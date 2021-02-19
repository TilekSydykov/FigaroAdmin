import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {StorageService} from "../storage/storage.service";
import {Endpoints} from "./endpoints";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `${this.storageService.getToken()}`
      }
    });

    return next.handle(request)
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
}
