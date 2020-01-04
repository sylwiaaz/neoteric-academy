import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offers: Offer[];
  private offersSubject = new Subject<Offer[]>();
  private mainPath = 'http://localhost:5000/offers/';

  constructor(private http: HttpClient) { }

  getOffersListener() {
    return this.offersSubject.asObservable();
  }

  getOffers() {
    this.http.get<Offer[]>(this.mainPath)
      .subscribe(offers => {
        this.offers = offers;
        this.offersSubject.next([...offers]);
      });
  }

  getOffer(index: string) {
    return this.http.get<Offer>(`${this.mainPath}offer/${index}`);
  }

  getOffersByPlace(place: string) {
    return this.http.get<Offer[] | []>(`${this.mainPath}${place}`)
      .subscribe(offers => {
        this.setOffers(offers);
      });
  }

  getOffersByPlaceAndTech(place: string, tech: string) {
    return this.http.get<Offer[] | []>(`${this.mainPath}${place}/${tech}`)
      .subscribe(offers => {
        this.setOffers(offers);
      });
  }

  getOffersByExp(place: string, tech: string, exp: string) {
    return this.http.get<Offer[] | []>(`${this.mainPath}${place}/${tech}/${exp}`)
      .subscribe(offers => {
        this.setOffers(offers);
      });
  }

  getOffersByMinSal(place: string, tech: string, exp: string, minSal: string) {
    return this.http.get<Offer[] | []>(`${this.mainPath}${place}/${tech}/${exp}/${minSal}`)
      .subscribe(offers => {
        this.setOffers(offers);
      });
  }

  getOffersByAllFilters(place: string, tech: string, exp: string, minSal: string, maxSal: string) {
    return this.http.get<Offer[] | []>(`${this.mainPath}${place}/${tech}/${exp}/${minSal}/${maxSal}`)
      .subscribe(offers => {
        this.setOffers(offers);
      });
  }

  private setOffers(offers: Offer[] | []) {
    this.offers = offers;
    if (this.offers.length > 0) {
      this.offersSubject.next([...this.offers]);
    } else {
      this.offersSubject.next([]);
    }
  }
}
