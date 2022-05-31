import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/exercise/service/exercise.service';
import { TrainingService } from '../../services/training.service';
import { Location } from '@angular/common';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  progress = 0;
  timer: any;
  finished = false;
  exercise: any;
  trainingId: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private location: Location,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit() {
    const exerciseId = this.route.snapshot.paramMap.get('vezba');
    this.trainingId = +this.route.snapshot.paramMap.get('training');
    this.exerciseService.getSingleExercises(+exerciseId).subscribe((data) => {
      this.exercise = data[0];
      this.startOrResumeTimer();
    });
  }

  startOrResumeTimer() {
    const step = this.exercise.trajanje / 5;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.finished = true;
        this.completeTraining();
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      switch (result) {
        case 1:
          this.startOrResumeTimer();
          break;
        case 2:
          this.completeTraining();
          break;
        case 3:
          this.location.back();
          clearInterval(this.timer);
          break;
        default:
          break;
      }
      if (result) {
        
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  completeTraining() {
    setTimeout(() => {
      const data = {
        email: 'nemanja@gmail.com',
        id_exercise: this.exercise.id,
        id_training: this.trainingId,
        percentage: this.progress
      }
      this.trainingService.createHistory(data).subscribe(() => {
        this.location.back();
      });
    }, 1500);
    clearInterval(this.timer);
  }
}
