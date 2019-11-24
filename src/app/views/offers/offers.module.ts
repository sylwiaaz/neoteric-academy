import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { OffersComponents } from './components';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ...OffersComponents
  ],
  declarations: [
    ...OffersComponents
  ],
  providers: [

  ]
})
export class OffersModule { }
