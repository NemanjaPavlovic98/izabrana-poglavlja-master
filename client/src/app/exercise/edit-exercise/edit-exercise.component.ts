import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditTrainingDialogComponent } from 'src/app/training/edit-training-dialog/edit-training-dialog.component';
import { Exercise } from 'src/app/training/model/exercise.model';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss'],
})
export class EditExerciseComponent {
  form: FormGroup;
  dialogTitle: string;

  exercise: Exercise;
  selectedExercise: any;
  muscles: any;

  mode: any;

  loading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private exerciseService: ExerciseService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.exercise = data.exercise;
    this.mode = data.mode;

    const formControls = {
      naziv: ['', Validators.required],
      trajanje: [null, Validators.required],
      kalorije: ['', Validators.required],
      grupa_misica: [null],
    };

    if(this.mode != 'delete'){
      this.exerciseService.getAllMuscles().subscribe((res) => {
        this.muscles = res;
        if (this.mode == 'update') {
          this.exerciseService
            .getSingleMuscles(this.exercise.id)
            .subscribe((res) => {
              this.selectedExercise = res.grupa_misica;
              this.form = this.fb.group(formControls);
              this.form.patchValue({ ...data.exercise });
              this.checkSelect();
            });
        } else if (this.mode == 'create') {
          this.form = this.fb.group({
            ...formControls,
          });
        }
      });
    }
  }

  checkSelect() {
    let anotherList: any[] = [];
    if(this.selectedExercise){
      this.selectedExercise.forEach((element) => {
        anotherList.push(element);
      });
      this.form.get('grupa_misica').patchValue(anotherList);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.mode == 'delete') {
      this.exerciseService
        .deleteExercise(this.exercise.id)
        .subscribe(() => this.dialogRef.close());
    } else {
      const exercise: Exercise = {
        ...this.exercise,
        ...this.form.value,
      };

      if (this.mode == 'update') {
        this.exerciseService.updateExercise(exercise)
        .subscribe(() => this.dialogRef.close());
      } else {
        this.exerciseService.saveExercise(exercise)
        .subscribe(() => this.dialogRef.close());
      }
    }
  }
}
