import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../shared/services';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private serverPath = 'http://localhost:5000/';
  public currentUser;
  private currentUserEmail;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService,
              private snackBarService: SnackBarService) {
    if (this.cookieService.get('id_token')) {
      this.isAuthenticated = true;
    }
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  createUser(email: string, password: string) {
    const authData = { email, password };
    return this.http.post(`${this.serverPath}auth/register`, authData)
      .subscribe((response) => {
        const message = 'Your account has been created succesfully. Please, login now.';
        this.snackBarService.showSuccess(message);
        this.router.navigate(['/auth/login']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          const message = 'Account with this email address already exists';
          this.snackBarService.showError(message);
        }
      });
  }

  login(email: string, password: string) {
    const authData = { email, password };
    this.http.post<any>(`${this.serverPath}auth/login`, authData)
      .subscribe((response) => {
        // this.currentUserEmail = response.updatedUser.email;
        // const value = response.updatedUser.token;

        this.currentUserEmail = response.user.email;
        this.currentUser = this.currentUserEmail.substr(0, this.currentUserEmail.indexOf('@'));
        const value = response.tokenData.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['']);
        this.cookieService.set('id_token', value, 0.041667, '/');
      }, error => {
        if (error instanceof HttpErrorResponse) {
          const message = 'Invalid email address or password';
          this.snackBarService.showError(message);
        }
      });
  }

  logout() {
    this.http.post(`${this.serverPath}auth/logout`, { withCredentials: true })
      .subscribe((response) => {
        this.isAuthenticated = false;
        this.cookieService.deleteAll('/');
        this.authStatusListener.next(false);
        this.snackBarService.showSuccess('You have logged out successfully.');
        this.router.navigateByUrl('/brands', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/offers']);
        });
      });
  }
}
