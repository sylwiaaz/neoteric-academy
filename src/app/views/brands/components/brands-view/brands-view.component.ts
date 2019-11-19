import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-view',
  templateUrl: './brands-view.component.html',
  styleUrls: ['./brands-view.component.scss']
})
export class BrandsViewComponent implements OnInit {
typeBrands = [
{
  type: 'Startup',
  icon: 'whatshot'
},
{
    type: 'Software House',
    icon: 'house'
}, {
  type: 'E-commerce',
  icon: 'shopping_basket'
},
{
  type: 'Corporation',
  icon: 'business'
},
{
  type: 'Other',
  icon: 'tv'
}
];
  constructor() { }

  ngOnInit() {
  }

}
