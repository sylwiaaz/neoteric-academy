import { FilterService } from 'src/app/views/offers/services';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OfferService } from '../../../services';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit, OnDestroy {
  offers;
  message: string;
  private offersSub: Subscription;

  constructor(private offerService: OfferService, private filterService: FilterService) { }

  ngOnInit() {
    this.offersSub = this.offerService.getOffersListener()
      .subscribe(offers => {
        if (offers.length === 0) {
          this.message = this.offerService.errorMessage;
        }
        this.offers = offers.sort((a, b) => {
          const firstDate: any = new Date(a.date);
          const secondDate: any = new Date(b.date);
          return secondDate - firstDate;
        });
      });
  }

  onRemoveFilters() {
    this.filterService.onClearFilters();
  }

  ngOnDestroy() {
    this.offersSub.unsubscribe();
  }
}
