import { BrandsViewComponent } from './views/brands/components/index';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouterUrls, AppRoutes } from './app-routing.config';
import { AuthLoginComponent, AuthRegisterComponent} from './views/auth/components';
import { OffersViewComponent } from './views/offers/components';

const routes: Routes = [
  // odkomentować gdy dodasz komponent offers
  { path: '', redirectTo: AppRouterUrls.DEFAULT, pathMatch: 'full' },
  {
    path: AppRoutes.AUTH,
    children: [
      { path: '', pathMatch: 'full', redirectTo: AppRouterUrls.LOGIN },
      { path: AppRoutes.LOGIN, component: AuthLoginComponent },
      { path: AppRoutes.REGISTER, component: AuthRegisterComponent }
    ]
  },
  { path: AppRoutes.BRANDS, component: BrandsViewComponent },
  { path: AppRoutes.DEFAULT, component: OffersViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
