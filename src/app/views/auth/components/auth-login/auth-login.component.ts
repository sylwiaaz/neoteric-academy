import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  hide = true;
  signInForm: FormGroup;
  authStatusSub: Subscription;
  isLogged = false;
  constructor(private authService: AuthService, private router: Router) { }

  onNavigateToRegister() {
    this.router.navigate(['/auth/register']);
    }

  ngOnInit() {
    this.signInForm = new FormGroup( {
      email: new FormControl(null, [Validators.required,
    Validators.email]),
    password: new FormControl(null, [Validators.required,  Validators.minLength(6) ])
    });
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      isAuth => {
        this.isLogged = isAuth;
      }
    );
  }

  onLogin() {
    if (this.signInForm.invalid) {
      return;
    }
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
