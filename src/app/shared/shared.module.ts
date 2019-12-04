import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponents } from './components';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ClickOutsideDirective } from './clickOutside.directive';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    ...SharedComponents,
    ClickOutsideDirective
  ],
  declarations: [
    ...SharedComponents,
    ClickOutsideDirective
  ],
  providers: [

  ]
})
export class SharedModule { }
