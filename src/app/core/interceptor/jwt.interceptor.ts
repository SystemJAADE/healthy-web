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
    
    // add header commons
    let headers = request.headers;
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');

    // add authorization header with jwt token if available
    const currentAuth = this.authenticationService.currentAuthValue;
    if (currentAuth && currentAuth.access_token) {
      headers = headers.set('Authorization', `Bearer ${currentAuth.access_token}`);
    }
    const cloneRequest = request.clone({ headers });

    return next.handle(cloneRequest);
  }
}
