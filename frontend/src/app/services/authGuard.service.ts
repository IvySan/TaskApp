import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
class AuthGuardService {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.authService.validate().pipe(
          map((data: any) => {
            if (data.email) {
              return true;
            } else if (data.statusCode === '401') {
              return this.router.navigate(['auth/log-in']);
            } else {
              return this.router.navigate(['auth/log-in']);;
            }
          }),
          catchError((error) => {
            return this.router.navigate(['auth/log-in']);;
          })
        );
    }
}

export const isAuthenticated : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AuthGuardService).canActivate(route, state);
}
