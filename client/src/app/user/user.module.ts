import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule, Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: ':email',
    component: UserComponent,
  },
];

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    MaterialModule
  ]
})
export class UserModule { }
