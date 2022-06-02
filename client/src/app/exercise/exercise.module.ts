import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { exercisesReducer } from './state-mgmt/reducers/index'
import { ExercisesEffects } from './state-mgmt/exercise.effects';

@NgModule({
  declarations: [
    EditExerciseComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature('exercises', exercisesReducer),
    EffectsModule.forFeature([ExercisesEffects])
  ]
})
export class ExerciseModule { }
