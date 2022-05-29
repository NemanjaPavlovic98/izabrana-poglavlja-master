import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTrainingDialogComponent } from '../edit-training-dialog/edit-training-dialog.component';
import { Training } from '../model/training.model';
import { defaultDialogConfig } from '../../shared/default-dialog-config';

@Component({
  selector: 'training-card-list',
  templateUrl: './training-card-list.component.html',
  styleUrls: ['./training-card-list.component.css'],
})
export class TrainingCardListComponent implements OnInit {
  @Input()
  trainings: Training[];

  @Output()
  trainingChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editTraining(training: Training) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Izmeni kurs',
      training,
      mode: 'update',
    };

    this.dialog
      .open(EditTrainingDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.trainingChanged.emit());
  }

  onDeleteTraining(training: number) {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Da li zelite da obrisete trening?',
      training,
      mode: 'delete',
    };

    this.dialog
      .open(EditTrainingDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.trainingChanged.emit());
  }
}
