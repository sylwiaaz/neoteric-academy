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

  ngOnInit() { }

  onFilterPlace(place: string) {
    this.filterService.selectedPlace = place;
    this.filterService.onNavigateByFilter();
  }
}
