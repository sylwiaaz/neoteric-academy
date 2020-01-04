import { UserMatchmakingComponent, UserProfileComponent, UserPreferencesComponent, UserSettingsComponent } from './views/user/components';
import { BrandsViewComponent } from './views/brands/components/index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouterUrls, AppRoutes } from './app-routing.config';
import { AuthLoginComponent, AuthRegisterComponent } from './views/auth/components';
import { OffersComponent, OfferDetailComponent, OffersListComponent } from './views/offers/components';
import { IsAuthenticatedOnLoginGuard, IsAuthenticatedGuard } from './guards';

const routes: Routes = [
  // odkomentować gdy dodasz komponent offers
  { path: '', redirectTo: AppRouterUrls.DEFAULT, pathMatch: 'full' },
  {
    path: AppRoutes.AUTH, canActivate: [IsAuthenticatedGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: AppRouterUrls.LOGIN },
      { path: AppRoutes.LOGIN, component: AuthLoginComponent, },
      { path: AppRoutes.REGISTER, component: AuthRegisterComponent },
    ]
  },
  {
    path: AppRoutes.BRANDS, children: [
      { path: '', component: BrandsViewComponent },
    ]
  },
   { path: AppRoutes.DASHBOARD, canActivate: [IsAuthenticatedOnLoginGuard], children: [
    { path: '', pathMatch: 'full', redirectTo: AppRouterUrls.PROFILE},
    { path: AppRoutes.PROFILE, component: UserProfileComponent},
    { path: AppRoutes.PREFERENCES, component: UserPreferencesComponent},
    { path: AppRoutes.SETTINGS, component: UserSettingsComponent},
    { path: AppRoutes.MATCHMAKING, component: UserMatchmakingComponent},
  ]
   },
  {
    path: AppRoutes.DEFAULT, component: OffersComponent, children: [
      { path: '', component: OffersListComponent },
      {
        path: AppRoutes.OFFER, children: [
          { path: AppRoutes.OFFERID, component: OfferDetailComponent }]
      },
      { path: AppRoutes.PLACE, component: OffersListComponent },
      { path: AppRoutes.FILTERTECH, component: OffersListComponent },
      { path: AppRoutes.FILTEREXP, component: OffersListComponent },
      { path: AppRoutes.FILTERMINSAL, component: OffersListComponent },
      { path: AppRoutes.FILTERMAXSAL, component: OffersListComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
