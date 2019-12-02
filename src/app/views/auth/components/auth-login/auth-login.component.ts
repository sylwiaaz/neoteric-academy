import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  hide = true;
  constructor(private authService: AuthService, private router: Router) { }
  onNavigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
