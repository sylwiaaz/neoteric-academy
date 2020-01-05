import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  offers: Offer[];
  offersSubject = new Subject<Offer[]>();
  private mainPath = 'http://localhost:5000/offers/';
  errorMessage: string;

  constructor(private http: HttpClient) { }

  getOffersListener() {
    return this.offersSubject.asObservable();
  }

  getOffers() {
    this.http.get<Offer[]>(this.mainPath).subscribe(offers => {
      this.offers = offers;
      this.offersSubject.next(offers);
    });
  }

  getOffer(index: string) {
    return this.http.get<Offer>(`${this.mainPath}offer/${index}`);
  }

  getOffersByFilter(place?, tech?, exp?, minSal?, maxSal?) {
    let pathAPI;
    if (maxSal) {
      pathAPI = `${this.mainPath}${place}/${tech}/${exp}/${minSal}/${maxSal}`;
    } else {
      if (minSal) {
        pathAPI = `${this.mainPath}${place}/${tech}/${exp}/${minSal}`;
      } else {
        if (exp) {
          pathAPI = `${this.mainPath}${place}/${tech}/${exp}`;
        } else {
          if (tech) {
            pathAPI = `${this.mainPath}${place}/${tech}`;
          } else {
            if (place) {
              if (place === 'remote') {
                pathAPI = `http://localhost:5000/remote`;
              } else {
                pathAPI = `${this.mainPath}${place}`;
              }
            }
          }
        }
      }
    }

    return this.http.get<Offer[]>(pathAPI).subscribe(
      offers => {
        this.offers = offers;
        this.offersSubject.next(this.offers);
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          this.errorMessage = error.error.message;
          this.offersSubject.next([]);
        }
      }
    );
  }
}
