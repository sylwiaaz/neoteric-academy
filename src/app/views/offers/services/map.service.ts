import { Injectable, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { OfferService } from './offer-service.service';
import { Subscription } from 'rxjs';
import { Offer } from './offer.model';

@Injectable({
  providedIn: 'root'
})

export class MapService implements OnDestroy {
  map;
  offers: Offer[];
  offersSub: Subscription;

  constructor(private router: Router, private offerService: OfferService) { }

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
    this.offersSub = this.offerService.getOffersListener()
      .subscribe(offers => {
        offers.forEach((offer) => {
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
            if (offer.premium) {
              this.router.navigate([`offers/offer/${offer._id}`, {premium: true}]);
            } else {
               this.router.navigate([`offers/offer/${offer._id}`]);
            }
          });
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

  ngOnDestroy() {
    this.offersSub.unsubscribe();
  }
}
