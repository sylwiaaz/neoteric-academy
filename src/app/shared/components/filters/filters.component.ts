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
  indexPlace: number;

  constructor(private filterService: FilterService) {
    this.places = this.filterService.places;
    this.otherPlaces = this.filterService.otherPlaces;
    // this.selectedPlace = this.filterService.selectedPlace;
  }

  ngOnInit() {
    if (sessionStorage.getItem('selectedPlace') === null) {
      this.selectedPlace = 'All';
    } else {
      this.selectedPlace = JSON.parse(sessionStorage.getItem('selectedPlace'));
    }
    this.indexPlace = this.filterService.allPlaces.findIndex(item => item === this.selectedPlace);
    if (this.indexPlace > 7) {
      this.isAddedPlace = this.selectedPlace;
    }
  }

  onAddPlace(otherOption) {
    this.isAddedPlace = otherOption;
    this.onChoosePlace(otherOption);
  }

  onChoosePlace(place) {
    this.selectedPlace = place;
    sessionStorage.setItem('selectedPlace', JSON.stringify(this.selectedPlace));
    this.filterService.selectedPlace = this.selectedPlace;
    this.filterService.onFilter();
  }
}
