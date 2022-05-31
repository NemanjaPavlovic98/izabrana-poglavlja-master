import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading = true;
  userLoggedIn;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
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

    this.userLoggedIn = !!this.authService.getAuthData();
    
    this.authService.isLoggedIn.subscribe(
      (res: boolean) => (this.userLoggedIn = res)
    );
  }

  logout() {
    this.authService.logout();
  }
}
