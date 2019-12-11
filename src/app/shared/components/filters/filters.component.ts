import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/views/offers/services';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  onShow = false;
  isAddedPlace: string;
  selectedPlace;
  places: string[];
  otherPlaces: string[];

  constructor(private filterService: FilterService) {
     this.places = this.filterService.places;
     this.otherPlaces = this.filterService.otherPlaces;
     this.selectedPlace = this.filterService.selectedPlace;
    }

  ngOnInit() {}

  onAddPlace(otherOption) {
    this.isAddedPlace = otherOption;
    this.onChoosePlace(otherOption);
  }

  onChoosePlace(place) {
    this.selectedPlace = place;
    this.filterService.selectedPlace = this.selectedPlace;
    this.filterService.onFilter();
  }
}
