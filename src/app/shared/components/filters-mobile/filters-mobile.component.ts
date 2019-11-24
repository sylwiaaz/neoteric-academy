import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters-mobile',
  templateUrl: './filters-mobile.component.html',
  styleUrls: ['./filters-mobile.component.scss']
})
export class FiltersMobileComponent implements OnInit {
  selectedPlace = 'All';

  otherPlaces = ['Białystok', 'Bielsko-Biała', 'Bydgoszcz', 'Częstochowa', 'Gliwice', 'Katowice', 'Kielce', 'Lublin', 'Łódź', 'Olsztyn', 'Opole', 'Toruń', 'Rzeszów', 'Szczecin'];
  places = ['All', 'Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Trójmiasto', 'Remote', 'World', ...this.otherPlaces];
  constructor() { }

  ngOnInit() {
  }

}
