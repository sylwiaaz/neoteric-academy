import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResizeService } from 'src/app/shared/services';

@Component({
  selector: 'app-brands-view',
  templateUrl: './brands-view.component.html',
  styleUrls: ['./brands-view.component.scss']
})
export class BrandsViewComponent implements OnInit, OnDestroy {
  typeBrands = [
    {
      type: 'All'
    },
    {
      type: 'Startup',
      icon: 'whatshot'
    },
    {
      type: 'Software House',
      icon: 'house'
    }, {
      type: 'E-commerce',
      icon: 'shopping_basket'
    },
    {
      type: 'Corporation',
      icon: 'business'
    },
    {
      type: 'Other',
      icon: 'tv'
    }
  ];
  selectedBrand = 'All';

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

  ngOnInit() { }
  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

}
