import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { ResizeService } from '../../../../shared/services';

@Component({
  selector: 'app-offers-filter',
  templateUrl: './offers-filter.component.html',
  styleUrls: ['./offers-filter.component.scss']
})
export class OffersFilterComponent implements OnInit, OnDestroy {
  slidersRefresh: EventEmitter<void> = new EventEmitter<void>();
  value = 20;
  highValue = 100;
  options: Options = {
    floor: 0,
    ceil: 100
  };
defaultValueExp = 'Exp. level';
  onShow = false;
  onShowExp = false;
  onShowSalary = false;

  selectedTech = 'All';
  assetsPath = '../../../../../assets/images/';
  technologies = [
    { name: 'JS', icon: `${this.assetsPath}js.svg`, background: `linear-gradient(-90deg, #FFC706, #FFAF00)` },
    { name: 'HTML', icon: `${this.assetsPath}html5.svg`, background: `linear-gradient(-90deg, #FF7D50, #FD5D21)` },
    { name: 'PHP', icon: `${this.assetsPath}php.svg`, background: `linear-gradient(-90deg, #41ADFA, #157CFC)` },
    { name: 'Ruby', icon: `${this.assetsPath}ruby.svg`, background: `linear-gradient(-90deg, #ef5350, #f44336)` },
    { name: 'Python', icon: `${this.assetsPath}python.svg`, background: `linear-gradient(-90deg, #1F5EB6, #1F7BC4)` },
    { name: 'Java', icon: `${this.assetsPath}java.svg`, background: `linear-gradient(-90deg, #FA656B, #F9597A)` },
    { name: '.Net', icon: `${this.assetsPath}dotNet.png`, background: `linear-gradient(-90deg, #3FC5E6, #4FA4FD)` },
    { name: 'Scala', icon: `${this.assetsPath}scala.png`, background: `linear-gradient(-90deg, #F86468, #F1464C)` },
    { name: 'C++', icon: `${this.assetsPath}C++.svg`, background: `linear-gradient(-90deg, #2FCFBB, #37DD9C)` },
    { name: 'Mobile', icon: `${this.assetsPath}mobile.svg`, background: `linear-gradient(-90deg, #E04F86, #BA4A8D)` },
    { name: 'Testing', icon: `${this.assetsPath}testing.svg`, background: `linear-gradient(-90deg, #89DB54, #65AF35)` },
    { name: 'DevOps', icon: `${this.assetsPath}devops.png`, background: `linear-gradient(-90deg, #5266E1, #8166E0)` },
    { name: 'Game', icon: `${this.assetsPath}game.svg`, background: `linear-gradient(-90deg, #ff4081, #ec407a)` }];
  otherTechnologies = [
    { name: 'UX/UI', icon: `${this.assetsPath}UX.svg`, background: `linear-gradient(-90deg, #ffb74d, #ff9800)` },
    { name: 'PM', icon: `${this.assetsPath}PM.svg`, background: `linear-gradient(-90deg, #80cbc4, #4db6ac)` },
    { name: 'Blockchain', icon: `${this.assetsPath}blockchain.svg`, background: `linear-gradient(-90deg, #AB47BC, #6A1B9A)` },
    { name: 'Security', icon: `${this.assetsPath}security.svg`, background: `linear-gradient(-90deg, #536DFE, #0D47A1)` },
    { name: 'Data', icon: `${this.assetsPath}data.svg`, background: `linear-gradient(-90deg, #009688, #00796B)` },
    { name: 'Golang', icon: `${this.assetsPath}golang.png`, background: `linear-gradient(-90deg, #6AD7E5, #6A8BE5)` },
    { name: 'SAP', icon: `${this.assetsPath}sap.svg`, background: `linear-gradient(-90deg, #02AFEB, #1B68C2)` },
    { name: 'Other', icon: `${this.assetsPath}devices.svg`, background: `linear-gradient(-90deg, #EC4CB6, #D44BD5)` }];
  allTechnologies = ['All', ...this.technologies.map(tech => tech.name), ...this.otherTechnologies.map(tech => tech.name)];

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;
  constructor(private resizeService: ResizeService) {
  }

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
