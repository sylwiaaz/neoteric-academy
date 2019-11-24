import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { BrandsComponents } from './components';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    ...BrandsComponents
  ],
  declarations: [
    ...BrandsComponents
  ],
  providers: [

  ]
})
export class BrandsModule { }
