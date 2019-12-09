import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferService } from './offer-service.service';


@Injectable({
  providedIn: 'root'
})

export class MapService {
  map;
  offers: any;
  constructor(private offerService: OfferService,
              private router: Router,
              private route: ActivatedRoute) {
                this.offers = this.offerService.getOffers();
              }

  initMap(): void {
    this.map = L.map('map', {
      center: [52.241, 19.226],
      zoom: 5.5,
      zoomSnap: 0.5
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  makeMarkers() {
    this.offers.forEach((offer, index ) => {
      const lat = offer.location[0];
      const lng = offer.location[1];
      const logoPath = `../../../../../../assets/images/${offer.logoPath}`;

      const customIcon = L.icon({
        iconUrl: logoPath,
        iconSize: [35, 35],
        iconAnchor: [20, 20],
        className: offer.tech
      });
      const marker = L.marker([lat, lng], { icon: customIcon, autoPan: true });
      marker.bindTooltip(this.makeTooltip(offer), { direction: 'top' });
      marker.addTo(this.map);
      marker.on('click', () => {
            this.router.navigate([`offers/${index}`]);
            // this.map.flyTo([lat, lng], 13);
          });
        });

  }

  makeTooltip(offer) {
    return '' + `<div class="offer-popup">
<div class="logo-popup"> ${offer.companyName} </div>
<div class="offer-info">
<span class="title-job">${offer.jobTitle}</span>
<span class="salary">${offer.salary}</span>
<span class="company-name">${offer.companyName}</span>
</div>
</div>`;
  }

  zoomOut() {
    this.map.setView([52.241, 19.226], 5.5);
  }

  zoomToPlace(location: number[]) {
    this.map.setView(location, 13);
  }
}
