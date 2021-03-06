import { MapService } from './../../../services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-map',
  templateUrl: './offers-map.component.html',
  styleUrls: ['./offers-map.component.scss']
})
export class OffersMapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.initMap();
    this.mapService.makeMarkers();
  }

}
