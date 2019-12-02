import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { AppRouterUrls } from '../../../../app-routing.config';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
offer;
appRouterUrls = AppRouterUrls;
showMoreClauseInfo = false;
displayFutureContsent = false;
  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.offer = this.offerService.getOffer(id);
  }

}
