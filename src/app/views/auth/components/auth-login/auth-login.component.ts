import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  hide = true;
  signUpForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }
  onNavigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  ngOnInit() {
    this.signUpForm = new FormGroup( {
      email: new FormControl(null, [Validators.required,
    Validators.email]),
    password: new FormControl(null, [Validators.required,  Validators.minLength(6) ])
    });
  }

  onLogin() {
    // console.log('ok');
  }
}
