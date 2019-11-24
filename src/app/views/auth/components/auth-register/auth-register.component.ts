import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';
import { AppRouterUrls } from '../../../../app-routing.config';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['../auth-login/auth-login.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  hide = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
