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
  currentValueSalary;

  selectedTech = 'All';
  selectedPlace: string;
  selectedExp: string;

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;

  constructor(private resizeService: ResizeService,
              private filterService: FilterService) { }

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
    this.selectedPlace = this.filterService.selectedPlace;
    this.technologies = this.filterService.technologies;
    this.otherTechnologies = this.filterService.otherTechnologies;
    this.allTechnologies = this.filterService.allTechnologies;
    this.currentValueSalary = this.signCurrentValue();
    this.resizeSubscription = this.resizeService.onResize$
      .subscribe(size => {
        this.isDesktopWidth = size.innerWidth > 1024 ? true : false;
      });
  }
  onAddedTech(otherOption) {
    this.addedTech = otherOption;
    this.onFilterTech(otherOption);
  }

  onChooseTech(tech) {
    this.onFilterTech(tech);
  }

  onFilterTech(tech) {
    if (tech.name) {
      this.selectedTech = tech.name;
    } else {
      this.selectedTech = tech;
    }
    this.filterService.selectedTech = this.selectedTech;
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

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}

