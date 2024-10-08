import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   if (this.authService.currentAccountValue) {
    //const userRole = this.authService.currentAccountValue.permission[0].role.name;
      const userPermision = this.authService.currentAccountValue.permission;

   /*   if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        console.log("redirigiendo role")
        this.router.navigate(['/authentication/signin']);
        return false;
      }*/
      return true;
    }
    console.log("redirigiendo no auth")

    this.router.navigate(['/authentication/signin']);
    return false;
  }
}
