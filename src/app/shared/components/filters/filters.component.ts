import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  langs = ['All', 'JS', 'Java', 'HTML', 'PHP', 'Ruby', 'Python', 'DevOps', '.Net', 'C++', 'Scala', 'Mobile', 'Testing', '...'];

  places = ['All', 'Warszawa', 'Kraków', 'Trójmiasto', 'Poznań', 'Remote', '...'];

  constructor() { }

  ngOnInit() {
  }

}
