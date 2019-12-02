import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['../auth-login/auth-login.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  hide = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onNavigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
