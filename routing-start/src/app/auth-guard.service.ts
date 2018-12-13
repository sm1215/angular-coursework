import { 
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  // canActivate can run synchronously or asynchronously so we've 
  // added a couple of return types that reflect this variation

  // Sync - running completely on the client
  // Async - reach out to a server or running something in a timeout (for example)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
        .then(
          (authenticated: boolean) => {
            if (authenticated) {
              return true;
            } else {
              this.router.navigate(['/']);              
            }
          }
        );
    }

  // canActivateChild can be used to protect child routes,
  // it provides the necessary hook to do so
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);
    }
}