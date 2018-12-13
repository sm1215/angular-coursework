import { Observable } from 'rxjs/Observable';
import { CanDeactivate. ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// The information for this service comes from Section 11, Lecture 139

// CanDeactivate is a generic type and will be used to wrap our own interface CanComponentDeactivate
// This forces some component / class to implement the CanDeactivate method
// This setup will make sure we can later easily connect a component to our CanDeactivate guard
export class CanDeactivateGuard implements CanDeactivate<CanCompnentDeactivate> {

  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // This is why we implemented the CanDeactivateGuard interface
      // Now the Angular Router can execute CanDeactivate in our service 
      // and can rely on the fact that the component we're currently on has the CanDeactivate method too
      return component.canDeactivate();
    }
}
