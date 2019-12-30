import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRouterUrls } from '../../../app-routing.config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../views/auth/services';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  isOpenUserDropdown = false;
  appRouterUrls = AppRouterUrls;
  authStatusSub: Subscription;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) {  }

  ngOnInit() {
    this.isLogged = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      isAuth => {
        this.isLogged = isAuth;
      }
    );
  }
  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
