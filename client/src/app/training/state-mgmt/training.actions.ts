import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Training } from '../model/training.model';

export const loadAllTrainings = createAction(
  '[Training resolver] Load All Trainings'
);

export const allTrainingsLoaded = createAction(
  '[Load Trainings Effect] All Trainings Loaded',
  props<{ trainings: Training[] }>()
);

export const trainingUpdate = createAction(
  '[Edit Dialog] Course Updated',
  props<{ update: Update<Training> }>()
);
