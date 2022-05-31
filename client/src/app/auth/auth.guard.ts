import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AuthService } from './auth.service';
import { AuthState } from './reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    //BEFORE STATE
    // const res = this.authService.getAuthData();
    // const isAuth = !!res;
    // if (isAuth) {
    //   return true;
    // }
    // return this.router.navigate(['/login']);

    //AFTER STATE
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
