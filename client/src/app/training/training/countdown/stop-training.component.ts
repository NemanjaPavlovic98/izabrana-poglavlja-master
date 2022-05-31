import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Da li zelite da prekinete trening?</h1>
            <mat-dialog-content>
              <p>Stigli ste do {{ passedData.progress }}%</p>
            </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="1">Nastavi</button>
              <button mat-button [mat-dialog-close]="2">Zavrsi</button>
              <button mat-button [mat-dialog-close]="3">Otkazi</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
