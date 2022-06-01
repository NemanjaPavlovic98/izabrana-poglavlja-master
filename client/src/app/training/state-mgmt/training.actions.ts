import { createAction, props } from '@ngrx/store';
import { Training } from '../model/training.model';

export const loadAllTrainings = createAction(
  '[Training resolver] Load All Trainings'
);

export const allTrainingsLoaded = createAction(
  '[Load Trainings Effect] All Trainings Loaded',
  props<{ trainings: Training[] }>()
);
