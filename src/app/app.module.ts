import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CoreGuards } from './guards';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './views/auth/auth.module';
import { BrandsModule } from './views/brands/brands.module';
import { OffersModule } from './views/offers/offers.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    AuthModule,
    BrandsModule,
    OffersModule
  ],
  providers: [
    CoreGuards
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
