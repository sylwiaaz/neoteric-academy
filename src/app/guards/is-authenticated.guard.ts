import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {

  constructor( private router: Router, private cookieService: CookieService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.cookieService.check('id_token')) {
      this.router.navigate(['/dashboard/profile']);
      return false;
    }
    return true;
  }
}
