import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { ResizeService } from 'src/app/shared/services';

@Component({
  selector: 'app-offers-view',
  templateUrl: './offers-view.component.html',
  styleUrls: ['./offers-view.component.scss']
})
export class OffersViewComponent implements OnInit, OnDestroy {
  slidersRefresh: EventEmitter<void> = new EventEmitter<void>();
  value = 20;
  highValue = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };

  onShow = false;
  onShowExp = false;
  oShowSalary = false;
  selectedTech = 'All';
  technologies = ['JS', 'HTML', 'PHP', 'Ruby', 'Python', 'Java', '.Net', 'Scala', 'C++', 'Mobile', 'Testing', 'DevOps', 'Game'];
  otherTechnologies = ['UX/UI', 'PM', 'Blockchain', 'Security', 'Data', 'Golang', 'SAP', 'Other'];
  allTechnologies = ['All', ...this.technologies, ...this.otherTechnologies];

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;
  constructor(private resizeService: ResizeService) {
    this.resizeSubscription = this.resizeService.onResize$
    .subscribe(size => {
      if (size.innerWidth > 1024) {
        this.isDesktopWidth = true;
      } else {
        this.isDesktopWidth = false;
      }
    });
   }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}
