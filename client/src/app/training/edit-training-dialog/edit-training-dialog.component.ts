import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TrainingService } from '../services/training.service';
import { Training } from '../model/training.model';
import { mimeType } from 'src/app/common/mime-type.validator';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import {
  trainingCreate,
  trainingDelete,
  trainingUpdate,
} from '../state-mgmt/training.actions';
import { selectAllExercises } from 'src/app/exercise/state-mgmt/exercise.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'training-dialog',
  templateUrl: './edit-training-dialog.component.html',
  styleUrls: ['./edit-training-dialog.component.scss'],
})
export class EditTrainingDialogComponent {
  imagePreview: string =
    'https://upload.wikimedia.org/wikipedia/commons/b/b1/Missing-image-232x150.png';

  form: FormGroup;
  dialogTitle: string;

  training: Training;
  exercises: any;
  selectedExercises: any = [];

  mode: any;

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private trainingService: TrainingService,
    private store: Store
  ) {
    this.dialogTitle = data.dialogTitle;
    this.training = data.training;
    this.mode = data.mode;

    const formControls = {
      naziv: ['', Validators.required],
      jacina: [null, Validators.required],
      opis: ['', Validators.required],
      vezbe: [null],
      omiljeni: [false, []],
      spreman: [false, []],
      slika: [
        null,
        { validators: Validators.required, asyncValidators: [mimeType] },
      ],
    };

    //BEFORE STATE
    // this.trainingService.getAllExercises().subscribe((res) => {
    //   this.exercises = res;
    //   if (this.mode == 'update') {
    //     this.trainingService
    //       .getExerciseForTraining(this.training.id)
    //       .subscribe((res) => {
    //         this.selectedExercises = res;
    //         this.form = this.fb.group(formControls);
    //         this.form.patchValue({ ...data.training });
    //         this.imagePreview = this.training.slika;
    //         this.checkSelect();
    //       });
    //   } else if (this.mode == 'create') {
    //     this.form = this.fb.group({
    //       ...formControls,
    //     });
    //   }
    // });

    // AFTER STATE
    this.store.pipe(select(selectAllExercises)).subscribe((res) => {
      this.exercises = res;
      if (this.mode == 'update') {
        this.trainingService
          .getExerciseForTraining(this.training.id)
          .subscribe((res) => {
            this.selectedExercises = res;
            this.form = this.fb.group(formControls);
            this.form.patchValue({ ...data.training });
            this.imagePreview = this.training.slika;
            this.checkSelect();
          });
      } else if (this.mode == 'create') {
        this.form = this.fb.group({
          ...formControls,
        });
      }
    });
  }

  checkSelect() {
    let anotherList: any[] = [];
    this.selectedExercises.forEach((element) => {
      anotherList.push(element.id_vezba);
    });

    this.form.get('vezbe').patchValue(anotherList);
  }

  onClose() {
    this.dialogRef.close();
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ slika: file });
    this.form.get('slika').updateValueAndValidity;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSave() {
    if (this.mode == 'delete') {
      //BEFORE STATE
      // this.trainingService
      //   .deleteTraining(this.training.id)
      //   .subscribe(() => this.dialogRef.close());

      //AFTER STATE
      this.store.dispatch(trainingDelete({ deletedId: this.training.id }));
      this.dialogRef.close();
    } else {
      const training: Training = {
        ...this.training,
        ...this.form.value,
      };

      if (this.mode == 'update') {
        //BEFORE STATE
        // this.trainingService
        //   .updateTraining(training)
        //   .subscribe(() => this.dialogRef.close());

        //AFTER STATE
        const update: Update<Training> = {
          id: training.id,
          changes: training,
        };
        this.store.dispatch(trainingUpdate({ update }));
        this.dialogRef.close();
      } else {
        //BEFORE STATE
        //   this.trainingService
        //     .saveTraining(training)
        //     .subscribe(() => this.dialogRef.close());

        //AFTER STATE
        this.store.dispatch(trainingCreate({ training }));
        this.dialogRef.close();
      }
    }
  }
}
