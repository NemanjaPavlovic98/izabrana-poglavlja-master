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
  '[Edit Dialog] Training Updated',
  props<{ update: Update<Training> }>()
);

export const trainingCreate = createAction(
  '[Add Dialog] Training Created',
  props<{ training: Partial<Training> }>()
);

export const trainingCreated = createAction(
  '[Training Effect] Added New Training',
  props<{ training: Training }>()
);

export const trainingDelete = createAction(
  '[Edit Dialog] Training Deleted',
  props<{ deletedId: number }>()
);