import { FilterService } from './../../../services/filter.service';
import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { ResizeService } from '../../../../../shared/services';


@Component({
  selector: 'app-offers-filter',
  templateUrl: './offers-filter.component.html',
  styleUrls: ['./offers-filter.component.scss']
})
export class OffersFilterComponent implements OnInit, OnDestroy {
  slidersRefresh: EventEmitter<void> = new EventEmitter<void>();

  technologies: any[];
  otherTechnologies: any[];
  allTechnologies: string[];
  indexTech;
  value = 0;
  highValue = 51000;
  options: Options = {
    floor: 0,
    ceil: 51000,
    step: 1000,
    translate: (value: number): string => {
      if (value > 0) {
        return value / 1000 + 'k';
      }
      return value + '';
    }
  };

  addedTech;
  onShow = false;
  isShowSalary = false;
  currentValueSalary: string;

  selectedTech;
  selectedExp: string;

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;

  constructor(private resizeService: ResizeService,
              private filterService: FilterService) {}

  signCurrentValue() {
    if (this.value === this.options.floor && this.highValue === this.options.ceil) {
      return '$ Salary';
    } else if (this.value === this.options.floor && this.highValue < this.options.ceil) {
      return `< ${this.highValue / 1000}k PLN`;
    } else if (this.value > this.options.floor && this.highValue === this.options.ceil) {
      return `${this.value / 1000}k+ PLN`;
    } else {
      return `${this.value / 1000}k - ${this.highValue / 1000}k PLN`;
    }
  }

  onShowSalary(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.isShowSalary = !this.isShowSalary;
  }

  ngOnInit() {
    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(size => {
        this.isDesktopWidth = size.innerWidth > 1024 ? true : false;
      });
    if (sessionStorage.getItem('selectedTech') === null) {
      this.selectedTech = 'All';
    } else {
      this.selectedTech = JSON.parse(sessionStorage.getItem('selectedTech'));
    }
    if (sessionStorage.getItem('addedTech') !== null) {
      this.addedTech = JSON.parse(sessionStorage.getItem('addedTech'));
    }

    this.technologies = this.filterService.technologies;
    this.otherTechnologies = this.filterService.otherTechnologies;
    this.allTechnologies = this.filterService.allTechnologies;
    this.currentValueSalary = this.signCurrentValue();


  }

  onFilterTech(tech) {
    if (tech.name) {
      this.selectedTech = tech.name;
    } else {
      this.selectedTech = tech;
    }
    // this.filterService.selectedTech = this.selectedTech;
    this.indexTech = this.allTechnologies.findIndex(item => item === this.selectedTech);
    if (this.indexTech > this.technologies.length) {
      this.addedTech = this.otherTechnologies[this.indexTech - this.technologies.length - 1];
      sessionStorage.setItem('addedTech', JSON.stringify(this.addedTech));
    }
    sessionStorage.setItem('selectedTech', JSON.stringify(this.selectedTech));
    this.filterService.onFilter();

  }

  onFilterExp(exp) {
    this.selectedExp = exp ? exp : 'All';
    this.filterService.selectedExp = this.selectedExp;
    this.filterService.onFilter();
  }

  onChooseSalary() {
    this.currentValueSalary = this.signCurrentValue();
    this.filterService.selectedMinSal = this.value / 1000 + 'k';
    this.filterService.selectedMaxSal = this.highValue / 1000 + 'k';
    this.filterService.onFilter();
  }

  isActiveBtn(tech) {
    if (tech === this.selectedTech) {
      return 'active';
    } else if (tech !== this.selectedTech && this.selectedTech !== 'All') {
      return 'inactive';
    }
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
    sessionStorage.removeItem('selectedTech');
    sessionStorage.removeItem('addedTech');
    sessionStorage.removeItem('selectedPlace');
  }
}

