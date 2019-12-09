import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  onShow = false;
  isAddedPlace: string;
  selectedPlace = 'All';
  places = ['All', 'Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Trójmiasto', 'Remote', 'World'];
  // tslint:disable-next-line: max-line-length
  otherPlaces = ['Białystok', 'Bielsko-Biała', 'Bydgoszcz', 'Częstochowa', 'Gliwice', 'Katowice', 'Kielce', 'Lublin', 'Łódź', 'Olsztyn', 'Opole', 'Toruń', 'Rzeszów', 'Szczecin'];
  allPlace = [...this.places, ...this.otherPlaces];

  constructor() { }

  ngOnInit() { }
  onAddPlace(otherOption) {
    this.selectedPlace = otherOption;
    this.isAddedPlace = otherOption;
  }
}
