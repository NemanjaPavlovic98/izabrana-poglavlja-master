import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

export const exercisegRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [
    EditExerciseComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule.forChild(exercisegRoutes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ExerciseModule { }
