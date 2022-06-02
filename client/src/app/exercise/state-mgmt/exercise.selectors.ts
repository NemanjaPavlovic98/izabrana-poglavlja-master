import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromExercises from './reducers/index';
import { ExerciseState } from './reducers/index';

export const selectExerciseState =
  createFeatureSelector<ExerciseState>('exercises');

export const selectAllExercises = createSelector(
  selectExerciseState,
  fromExercises.selectAll
);

export const areExercisesLoaded = createSelector(
  selectExerciseState,
  state => state.allTExercisesLoaded
)