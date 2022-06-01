import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Training } from '../../model/training.model';
import { TrainingActions } from '../action-types';

export const trainingsFeatureKey = 'trainings';

export interface TrainingState extends EntityState<Training> {
}

export const adapter = createEntityAdapter<Training>();

export const initialTrainingState = adapter.getInitialState();

export const trainingsReducer = createReducer(
  initialTrainingState,
  on(TrainingActions.allTrainingsLoaded, (state, action) =>
    adapter.addMany(action.trainings, state)
  )
);

export const {selectAll} = adapter.getSelectors();