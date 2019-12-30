import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppRouterUrls } from '../../../../app-routing.config';
import { AuthService } from '../../../auth/services';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
  appRouterUrls = AppRouterUrls;
  currentUser: string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
  }

}
