import { OfferService } from './../../../../services/offer-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { AppRouterUrls } from '../../../../../../app-routing.config';
import { Offer } from '../../../../services/offer.model';

@Component({
  selector: 'app-offers-item',
  templateUrl: './offers-item.component.html',
  styleUrls: ['./offers-item.component.scss']
})
export class OffersItemComponent implements OnInit {
  @Input() offer: Offer;
  @Input() index: string;

  backgroundClass: string;
  appRouterUrls = AppRouterUrls;
  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.backgroundClass = this.offerService.classOfOffer(this.offer.tech);
  }

  timeSince(date) {
    if (typeof date !== 'object') {
      date = (new Date(date).getTime()) / 1000;
    }
    const seconds = Math.floor(((new Date().getTime() / 1000) - date));
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) { return interval + 'y ago'; }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) { return interval + 'm ago'; }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) { return interval + 'd ago'; }

    if (interval < 1) { return 'new'; }
  }

}
