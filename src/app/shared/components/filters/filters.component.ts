import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  onShow = false;
  selectedPlace = 'All';
  langs = ['All', 'JS', 'Java', 'HTML', 'PHP', 'Ruby', 'Python', 'DevOps', '.Net', 'C++', 'Scala', 'Mobile', 'Testing'];

  places = ['All', 'Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Trójmiasto', 'Remote', 'World'];
  otherPlaces = ['Białystok', 'Bielsko-Biała', 'Bydgoszcz', 'Częstochowa', 'Gliwice', 'Katowice', 'Kielce', 'Lublin', 'Łódź', 'Olsztyn', 'Opole', 'Toruń', 'Rzeszów', 'Szczecin'];

  constructor() {

  }

  ngOnInit() {
  }
}
