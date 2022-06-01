import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../../shared/default-dialog-config';
import { EditTrainingDialogComponent } from '../edit-training-dialog/edit-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, shareReplay } from 'rxjs/operators';
import { TrainingService } from '../services/training.service';
import { compareTrainings, Training } from '../model/training.model';
import { Store, select } from '@ngrx/store';
import { TrainingState } from '../state-mgmt/reducers';
import {
  selectFavouriteTrainings,
  selectNotReadyTrainings,
  selectReadyTrainings,
} from '../state-mgmt/training.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  waitingApproval$: Observable<number>;

  loading$: Observable<boolean>;

  allTrainings$: Observable<Training[]>;

  notReadyTrainings$: Observable<Training[]>;

  favouriteTrainings$: Observable<Training[]>;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<TrainingState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    //BEFORE STATE
    // const trainings$ = this.trainingService.getAllTrainings().pipe(
    //   shareReplay()
    // );

    // this.loading$ = trainings$.pipe(map((trainings) => !!trainings));

    // this.allTrainings$ = trainings$.pipe(
    //   map((trainings) => trainings.filter((training) => !!training.spreman))
    // );

    // this.notReadyTrainings$ = trainings$.pipe(
    //   map((trainings) => trainings.filter((training) => !training.spreman))
    // );

    // this.favouriteTrainings$ = trainings$.pipe(
    //   map((trainings) => trainings.filter((training) => training.omiljeni && training.spreman))
    // );

    //AFTER STATE
    this.allTrainings$ = this.store.pipe(select(selectReadyTrainings));

    this.notReadyTrainings$ = this.store.pipe(select(selectNotReadyTrainings));

    this.favouriteTrainings$ = this.store.pipe(
      select(selectFavouriteTrainings)
    );
  }

  onAddTrainig() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Kreiraj trening',
      mode: 'create',
    };

    this.dialog
      .open(EditTrainingDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.reload());
  }
}
