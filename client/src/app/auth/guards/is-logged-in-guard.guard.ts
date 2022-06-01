import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from '../state-mgmt/auth.selectors';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //BEFORE STATE
    // const res = this.authService.getAuthData();
    // if (!res) {
    //   return true;
    // }
    // this.router.navigate(['/training']);
    // return false;

    //AFTER STATE
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/training']);
        }
      }),
      map(() => true)
    );
  }
}
