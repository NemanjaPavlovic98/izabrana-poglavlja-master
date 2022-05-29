import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { defaultDialogConfig } from 'src/app/shared/default-dialog-config';
import { Exercise } from 'src/app/training/model/exercise.model';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'naziv',
    'trajanje',
    'kalorije',
    'misic',
    'akcije',
  ];

  waitingApproval$: Observable<number>;

  loading$: Observable<boolean>;

  allExercises$: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.allExercises$ = this.exerciseService.getAllExercises().pipe(
      map((exercises) => {
        exercises.map((exercise) => {
          this.exerciseService
            .getSingleMuscles(exercise.id)
            .subscribe((data) => {
              let strNaziv = '';
              let arrIds = [];

              for (const key in data) {
                strNaziv = strNaziv.concat(', ', data[key].naziv);
                arrIds.push(data[key].id);
              }
              exercise['grupa_misica_naziv'] = strNaziv.slice(2);
              exercise['grupa_misica'] = arrIds;
              return exercise;
            });
        });
        return exercises;
      }),
      shareReplay()
    );

    this.loading$ = this.allExercises$.pipe(map((exercise) => !!exercise));
  }

  onAddExercise() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Kreiraj vezbu',
      mode: 'create',
    };

    this.dialog
      .open(EditExerciseComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.reload());
  }

  onEditExercise(data: any) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Izmeni vezbu',
      mode: 'update',
      exercise: data,
    };

    this.dialog
      .open(EditExerciseComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.reload());
  }

  onDeleteExercise(data: any) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Da li zelite da obrisete trening?',
      exercise: data,
      mode: 'delete',
    };

    this.dialog
      .open(EditExerciseComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.reload());
  }
}
