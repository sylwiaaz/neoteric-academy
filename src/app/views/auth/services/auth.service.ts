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
  public currentUser = '';

  constructor(private http: HttpClient,
              private router: Router,
              private snackBarService: SnackBarService) { }

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
        console.log(response);
        const message = 'Your account has been created succesfully. Please, login now.';
        this.snackBarService.showSuccess(message);
        this.router.navigate(['/auth/login']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          const message = 'Account with this email address already exists';
          this.snackBarService.showError(message);
          console.log(error.error.message);
        }
      });
  }

  login(email: string, password: string) {
    const authData = { email, password };
    this.http.post<{ _id: number, email: string, password: string }>(`${this.serverPath}auth/login`, authData, { withCredentials: true })
      .subscribe((response) => {
        const user = response.email;
        this.currentUser = user.substr(0, response.email.indexOf('@'));
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          const message = 'Invalid email address or password';
          this.snackBarService.showError(message);
          console.log(error);
          console.log(error.error.message);
        }
      });
  }

  logout() {
    this.http.post(`${this.serverPath}auth/logout`, { withCredentials: true })
      .subscribe((response) => { },
      error => {
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.router.navigate(['']);
      });

  }
}
