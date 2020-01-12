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
  clickSubmit = false;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required,
      Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      termAccept: new FormControl(null, Validators.requiredTrue)
    });
  }

  onNavigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onRegister() {
    this.clickSubmit = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.createUser(this.registerForm.value.email, this.registerForm.value.password);
  }

  isInvalidCheckbox() {
    if (this.clickSubmit && !this.registerForm.get('termAccept').value) {
        return true;
    }
    return false;
  }
}
