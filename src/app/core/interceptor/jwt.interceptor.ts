import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentAuth = this.authenticationService.currentAuthValue;
    if (currentAuth && currentAuth.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentAuth.access_token}`,
        },
      });
    }

    return next.handle(request);
  }
}
