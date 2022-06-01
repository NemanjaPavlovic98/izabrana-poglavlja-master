import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Training } from '../model/training.model';
import { TrainingService } from '../services/training.service';
import { TrainingActions } from './action-types';
import { allTrainingsLoaded, trainingCreated } from './training.actions';

@Injectable()
export class TrainingsEffects {
  loadTrainings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainingActions.loadAllTrainings),
      concatMap((action) => this.trainingService.getAllTrainings()),
      map((trainings) => allTrainingsLoaded({ trainings }))
    )
  );
  saveTraining$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TrainingActions.trainingUpdate),
        concatMap((action) =>
          this.trainingService.updateTraining(action.update.changes)
        )
      ),
    { dispatch: false }
  );

  addTraining$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainingActions.trainingCreate),
      concatMap((action) => this.trainingService.saveTraining(action.training)),
      map((res: any) => {
        console.log(res);
        return trainingCreated({ training: res.training });
      })
    )
  );

  deleteTraining$ = createEffect(() =>
  this.actions$.pipe(
    ofType(TrainingActions.trainingDelete),
    concatMap((action) =>
      this.trainingService.deleteTraining(action.deletedId)
    )
  ), {dispatch: false}
);

  constructor(
    private actions$: Actions,
    private trainingService: TrainingService
  ) {}
}
