import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  innerWidth: any;
  isDesktopWidth: boolean;
  desktopWidthView = 1024;

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= this.desktopWidthView) {
      this.isDesktopWidth = true;
    } else {
      this.isDesktopWidth = false;
    }
    // console.log(this.innerWidth);
    // console.log(this.isDesktopWidth);
  }
  constructor() {
    this.onResize();
  }
}
