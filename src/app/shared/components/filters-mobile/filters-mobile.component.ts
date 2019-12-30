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

  constructor(private filterService: FilterService) {
    this.places = this.filterService.allPlaces;
    this.selectedPlace = this.filterService.selectedPlace;
  }

  ngOnInit() {
    if (sessionStorage.getItem('selectedPlace') === null) {
      this.selectedPlace = 'All';
    } else {
      this.selectedPlace = JSON.parse(sessionStorage.getItem('selectedPlace'));
    }
  }

  onFilterPlace(place) {
    this.filterService.selectedPlace = place;
    sessionStorage.setItem('selectedPlace', JSON.stringify(place));
    this.filterService.onFilter();
  }
}
