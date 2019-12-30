import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRouterUrls } from '../../../app-routing.config';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../views/auth/services';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  isLogged = false;
  authStatusSub: Subscription;
  isOpenDropdown = false;
  appRouterUrls = AppRouterUrls;
  currentUser: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService) {
  }

  changeBodyScrollBar(drawer) {
    document.body.style.overflow = drawer.opened ? 'hidden' : 'auto';
  }

  ngOnInit() {
    this.isLogged = this.authService.getIsAuth();
    this.currentUser = this.authService.currentUser;
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      isAuth => {
        this.isLogged = isAuth;
        this.currentUser = this.authService.currentUser;
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

