import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService } from '../../../services';
import { Offer } from '../../../services/offer.model';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit, OnDestroy {
  offers: Offer[];

  constructor(private offerService: OfferService) {
    this.offerService.getOffers().subscribe((offers) => {
      this.offers = offers;
    });
  }

  ngOnInit() { }


  ngOnDestroy() { }
}
