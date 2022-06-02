import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TrainingCardListComponent } from './training-card-list/training-card-list.component';
import { EditTrainingDialogComponent } from './edit-training-dialog/edit-training-dialog.component';
import { TrainingService } from './services/training.service';
import { TrainingComponent } from './training/training.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { CountdownComponent } from './training/countdown/countdown.component';
import { StopTrainingComponent } from './training/countdown/stop-training.component';
import { TrainingsResolver } from './resolvers/training.resolver';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { trainingsReducer } from './state-mgmt/reducers/index'
import { TrainingsEffects } from './state-mgmt/training.effects';
import { ExercisesResolver } from '../exercise/resolvers/exercise.resolver';
// import { EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';

export const trainingRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      trainings: TrainingsResolver,
      courses: ExercisesResolver
    },
  },
  {
    path: 'start',
    component: CountdownComponent,
  },
  {
    path: ':trainingUrl',
    component: TrainingComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(trainingRoutes),
    MaterialModule,
    StoreModule.forFeature('trainings', trainingsReducer),
    EffectsModule.forFeature([TrainingsEffects])
  ],
  declarations: [
    HomeComponent,
    TrainingCardListComponent,
    EditTrainingDialogComponent,
    TrainingComponent,
    CountdownComponent,
    StopTrainingComponent,
  ],
  exports: [
    HomeComponent,
    TrainingCardListComponent,
    EditTrainingDialogComponent,
    TrainingComponent,
  ],
  entryComponents: [EditTrainingDialogComponent],
  providers: [TrainingService, TrainingsResolver, ExercisesResolver],
})
export class TrainingModule {
  constructor() {}
}
