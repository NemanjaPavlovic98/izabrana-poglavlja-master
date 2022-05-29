import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

//MATERIAL
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialModule } from './shared/material.module';

const routes: Routes = [
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule)
  },
  {
    path: '**',
    redirectTo: '/training'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MaterialModule
    // AuthModule.forRoot(),
    // StoreModule.forRoot(authReducer),
    // StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
