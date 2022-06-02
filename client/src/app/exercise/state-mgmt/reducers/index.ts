import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Exercise } from 'src/app/training/model/exercise.model';
import { ExerciseActions } from '../action-types';

export const exercisesFeatureKey = 'exercises';

export interface ExerciseState extends EntityState<Exercise> {
  allTExercisesLoaded: boolean;
}

export const adapter = createEntityAdapter<Exercise>();

export const initialExerciseState = adapter.getInitialState({
  allTExercisesLoaded: false,
});

export const exercisesReducer = createReducer(
  initialExerciseState,
  on(ExerciseActions.allExercisesLoaded, (state, action) =>
    adapter.addMany(action.exercises, { ...state, allTExercisesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
