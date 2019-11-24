import { ResizeService } from './shared/services/resize.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;

  constructor(private resizeService: ResizeService) {  }

  ngOnInit() {
    this.resizeSubscription = this.resizeService.onResize$
    .subscribe(size => {
      if (size.innerWidth > 1024) {
        this.isDesktopWidth = true;
      } else {
        this.isDesktopWidth = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
