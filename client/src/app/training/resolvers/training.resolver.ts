import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { TrainingActions } from '../state-mgmt/action-types';
import { TrainingState } from '../state-mgmt/reducers';
import { areTrainingsLoaded } from '../state-mgmt/training.selectors';

@Injectable()
export class TrainingsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<TrainingState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(areTrainingsLoaded),
      tap((trainingsLoaded) => {
        if (!this.loading && !trainingsLoaded) {
          this.loading = true;
          this.store.dispatch(TrainingActions.loadAllTrainings());
        }
      }),
      filter(trainingsLoaded => trainingsLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
