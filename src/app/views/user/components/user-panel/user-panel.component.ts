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
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = localStorage.getItem('currentUser');
  }

  onLogout() {
    this.authService.logout();
  }

}
