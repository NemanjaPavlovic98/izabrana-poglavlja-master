import { createAction, props } from '@ngrx/store';
import { Exercise } from 'src/app/training/model/exercise.model';

export const loadAllExercises = createAction(
  '[Exercise resolver] Load All Exercises'
);

export const allExercisesLoaded = createAction(
  '[Load Exercises Effect] All Exercises Loaded',
  props<{ exercises: Exercise[] }>()
);
