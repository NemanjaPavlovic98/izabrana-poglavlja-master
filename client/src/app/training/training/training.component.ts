import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  first,
  map,
  shareReplay,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { Exercise } from '../model/exercise.model';
import { Training } from '../model/training.model';
import { TrainingService } from '../services/training.service';

@Component({
  selector: 'training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  training$: Observable<Training>;
  training: Training;

  vezbe: Exercise[];

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;

  constructor(
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const trainingUrl = this.route.snapshot.paramMap.get('trainingUrl');

    this.training$ = this.trainingService.getTrainigByUrl(+trainingUrl).pipe(
      tap((res) => (this.training = res[0])),
      shareReplay()
    );

    this.training$
      .pipe(
        concatMap((training) =>
          this.trainingService.findExercise(training[0].id)
        )
      )
      .subscribe((res) => (this.vezbe = res));
  }

  onStartExercise(vezba: any){
    // vezba.finished = !vezba.finished;
    this.router.navigate(['training/start', {vezba: vezba.id, training: this.training.id}]);
  }
}
