import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { UserComponents } from './components/index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ...UserComponents
  ],
  declarations: [
    ...UserComponents
  ],
  providers: [

  ]
})
export class UserModule { }
