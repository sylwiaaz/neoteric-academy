import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/views/offers/services';

@Component({
  selector: 'app-filters-mobile',
  templateUrl: './filters-mobile.component.html',
  styleUrls: ['./filters-mobile.component.scss']
})
export class FiltersMobileComponent implements OnInit {
  selectedPlace: string;
  places: string[];

  constructor(private router: Router, private filterService: FilterService) {
    this.places = this.filterService.allPlaces;
    this.selectedPlace = this.filterService.selectedPlace;
  }

  ngOnInit() {
  }

  onFilterPlace(place) {
      this.filterService.selectedPlace = place;
      this.filterService.onFilter();
  }
}
