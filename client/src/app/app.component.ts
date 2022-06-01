import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AuthState } from './auth/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from './auth/state-mgmt/auth.selectors';
import { login, logout } from './auth/state-mgmt/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = true;
  userLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token =  JSON.parse(localStorage.getItem("token"));
    if(user && token) {
      this.store.dispatch(login({user: {email: user, token: token}}))
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    //BEFORE STATE
    // this.userLoggedIn = !!this.authService.getAuthData();
    // this.authService.isLoggedIn.subscribe(
    //   (res: boolean) => (this.userLoggedIn = res)
    // );

    //AFTER STATE
    this.userLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    );
  }

  logout() {
    //BEFORE STATE
    // this.authService.logout();

    //AFTER STATE
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }
}
