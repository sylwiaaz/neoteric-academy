import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from './offer.model';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offers: Offer[];

  constructor(private http: HttpClient) { }

  getOffers() {
    return this.http.get<Offer[]>('http://localhost:5000/offers');
  }

  getOffer(index: number) {
     return this.offers[index];
  }
}
