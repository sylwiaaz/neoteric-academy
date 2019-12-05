import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { OfferService } from '../../../services';


@Component({
  selector: 'app-offers-map',
  templateUrl: './offers-map.component.html',
  styleUrls: ['./offers-map.component.scss']
})
export class OffersMapComponent implements OnInit {
  offers: any;
  private map;
  constructor(private offersService: OfferService) { }

  ngOnInit() {
    this.offers = this.offersService.getOffers();
    this.initMap();
    this.makeMarkers(this.map);
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [52.241, 19.226],
      zoom: 5
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  makeMarkers(map: L.map) {
    this.offers.forEach(offer => {
      const lat = offer.location[0];
      const lng = offer.location[1];
      const logoPath = `../../../../../../assets/images/${offer.logoPath}`;

      const customIcon = L.icon({
        iconUrl: logoPath,
        iconSize: [35, 35],
        iconAnchor: [20, 20],
        className: offer.tech
      });

      const marker = L.marker([lat, lng], { icon: customIcon });
      marker.bindPopup(this.makePopup(offer));
      marker.addTo(map);
    });

  }

  makePopup(offer) {
    return '' + `<div class="offer-popup">
    <div class="logo-popup"> ${offer.companyName} </div>
    <div class="offer-info">
    <span class="title-job">${offer.jobTitle}</span>
    <span class="salary">${offer.salary}</span>
    <span class="company-name">${offer.companyName}</span>
    </div>
    </div>`;
  }
}
