import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

// in this module we import every angular material module
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule,
    LayoutModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
    MatListModule,
    LayoutModule
  ]
})
export class MaterialModule { }
