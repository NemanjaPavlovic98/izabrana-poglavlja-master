import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store, select } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseActions } from '../state-mgmt/action-types';
import { areExercisesLoaded } from '../state-mgmt/exercise.selectors';
import { ExerciseState } from '../state-mgmt/reducers';

@Injectable()
export class ExercisesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<ExerciseState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(areExercisesLoaded),
      tap((exercisesLoaded) => {
        if (!this.loading && !exercisesLoaded) {
          this.loading = true;
          this.store.dispatch(ExerciseActions.loadAllExercises());
        }
      }),
      filter(trainingsLoaded => trainingsLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
