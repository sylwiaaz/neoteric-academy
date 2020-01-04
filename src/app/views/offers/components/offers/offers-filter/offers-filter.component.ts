import { FilterService } from './../../../services/filter.service';
import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { ResizeService } from '../../../../../shared/services';
import { Router } from '@angular/router';

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

  expOptions = ['all', 'junior', 'mid', 'senior'];
  value: number;
  highValue: number;
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

  onShow = false;
  isShowSalary = false;
  onShowExp = false;
  currentValueSalary: string;
  addedTech: string | {};
  selectedTech: string;
  selectedExp: string;

  public isDesktopWidth = window.innerWidth > 1024 ? true : false;
  private resizeSubscription: Subscription;

  constructor(
    private resizeService: ResizeService,
    private filterService: FilterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.technologies = this.filterService.technologies;
    this.otherTechnologies = this.filterService.otherTechnologies;
    this.allTechnologies = this.filterService.allTechnologies;

    this.selectedTech = this.filterService.selectedTech;
    this.selectedExp = this.filterService.selectedExp;
    this.value = this.changeSelectedSalaryToNumber(this.filterService.selectedMinSal);
    this.highValue = this.changeSelectedSalaryToNumber(this.filterService.selectedMaxSal);

    this.resizeSubscription = this.resizeService.onResize$.subscribe(size => {
      this.isDesktopWidth = size.innerWidth > 1024 ? true : false;
    });

    this.updateAddedTech();
    this.currentValueSalary = this.signCurrentValue();
  }

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

  changeSelectedSalaryToNumber(s): number {
    return s = (+[s.slice(0, s.length - 1)] * 1000);
  }

  onFilterTech(tech) {
    if (tech.name) {
      this.selectedTech = tech.name;
    } else {
      this.selectedTech = tech;
    }
    this.filterService.selectedTech = this.selectedTech;
    this.filterService.onNavigateByFilter();
    this.updateAddedTech();
  }

  updateAddedTech() {
    const indexTech = this.allTechnologies.findIndex(
      item => item.toLowerCase() === this.selectedTech.toLowerCase()
    );
    if (indexTech > this.technologies.length) {
      this.addedTech = this.otherTechnologies[indexTech - this.technologies.length - 1];
    }
  }

  onFilterExp(exp: string) {
    this.selectedExp = exp;
    this.filterService.selectedExp = exp;
    this.filterService.onNavigateByFilter();
  }

  onChooseSalary() {
    this.currentValueSalary = this.signCurrentValue();
    this.filterService.selectedMinSal = this.value / 1000 + 'k';
    this.filterService.selectedMaxSal = this.highValue / 1000 + 'k';
    this.filterService.onNavigateByFilter();
  }

  isActiveBtn(tech) {
    if (tech.toLowerCase() === this.selectedTech.toLowerCase()) {
      return 'active';
    } else if (
      tech.toLowerCase() !== this.selectedTech.toLowerCase() && this.selectedTech !== 'All' ) {
      return 'inactive';
    }
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
