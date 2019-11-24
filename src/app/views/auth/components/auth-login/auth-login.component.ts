import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { AppRouterUrls } from '../../../../app-routing.config';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
  hide = true;
  constructor(private authService: AuthService) { }

}
