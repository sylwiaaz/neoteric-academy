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
  selectedPlace: string;
  places: string[];
  otherPlaces: string[];
  indexPlace: number;

  constructor(private filterService: FilterService) {
    this.places = this.filterService.places;
    this.otherPlaces = this.filterService.otherPlaces;
  }

  ngOnInit() {
    this.selectedPlace = this.filterService.selectedPlace;
    this.indexPlace = this.filterService.allPlaces.findIndex(item => item === this.selectedPlace);
    if (this.indexPlace > 7) {
      this.isAddedPlace = this.selectedPlace;
    }
  }

  onAddPlace(otherOption: string) {
    this.isAddedPlace = otherOption;
    this.onChoosePlace(otherOption);
  }

  onChoosePlace(place: string) {
    this.selectedPlace = place;
    this.filterService.selectedPlace = this.selectedPlace;
    this.filterService.onNavigateByFilter();
  }
}
