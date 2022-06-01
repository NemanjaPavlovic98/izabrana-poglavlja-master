import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';
import { TrainingActions } from '../state-mgmt/action-types';
import { TrainingState } from '../state-mgmt/reducers';

@Injectable()
export class TrainingsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<TrainingState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(TrainingActions.loadAllTrainings());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
