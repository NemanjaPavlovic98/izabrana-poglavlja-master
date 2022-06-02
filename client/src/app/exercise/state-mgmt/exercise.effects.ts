import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { ExerciseService } from '../service/exercise.service';
import { ExerciseActions } from './action-types';
import { allExercisesLoaded } from './exercise.actions';

@Injectable()
export class ExercisesEffects {
  loadExercises$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ExerciseActions.loadAllExercises),
      concatMap((action) => this.exerciseService.getAllExercises()),
      map((exercises) => allExercisesLoaded({ exercises }))
    )
  );

  constructor(
    private actions$: Actions,
    private exerciseService: ExerciseService
  ) {}
}
