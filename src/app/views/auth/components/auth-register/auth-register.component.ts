import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['../auth-login/auth-login.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required,
      Validators.email]),
      termAccept: new FormControl(null, Validators.required)
    });
  }

  onNavigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onRegister() {
    // console.log('ok');
  }

  isInvalid() {
    if (!this.registerForm.get('termAccept').valid) {
      if (this.registerForm.get('email').touched || this.registerForm.get('termAccept').touched) {
        return true;
      }
    }
    return false;
  }
}
