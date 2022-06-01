import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TrainingState } from './reducers';
import * as fromTrainings from './reducers/index';

export const selectTrainingState =
  createFeatureSelector<TrainingState>('trainings');

export const selectAllTrainings = createSelector(
  selectTrainingState,
  fromTrainings.selectAll
);

export const selectReadyTrainings = createSelector(
  selectAllTrainings,
  (trainings) => trainings.filter((training) => !!training.spreman)
);

export const selectNotReadyTrainings = createSelector(
  selectAllTrainings,
  (trainings) => trainings.filter((training) => !training.spreman)
);

export const selectFavouriteTrainings = createSelector(
  selectAllTrainings,
  (trainings) =>
    trainings.filter((training) => training.omiljeni && training.spreman)
);
