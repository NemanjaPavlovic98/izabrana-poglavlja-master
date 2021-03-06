import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
// import { AuthState } from '../reducers';
import { login } from '../state-mgmt/auth.actions';

import { AuthService } from '../auth.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AuthService>
  ) {
    this.form = fb.group({
      email: ['nemanja@gmail.com', [Validators.required]],
      password: ['test', [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth
      .login(val.email, val.password)
      .pipe(
        take(1),
        tap((res) => {
          this.store.dispatch(login({ user: {email: res.user, token: res.token} }));

          this.router.navigateByUrl('/training');
        })
      )
      .subscribe(noop, () => alert('Login failed'));
  }
}
