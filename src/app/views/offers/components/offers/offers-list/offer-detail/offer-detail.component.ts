import { Offer } from './../../../../services/offer.model';
import { MapService } from './../../../../services';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../../services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppRouterUrls } from '../../../../../../app-routing.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
  id: string;
  showMoreClauseInfo = false;
  displayFutureContsent = false;
  applyCVForm: FormGroup;
  isInvalidForm: boolean;

  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private mapService: MapService,
              private location: Location) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.offerService.getOffer(this.id)
        .subscribe(offer => {
          this.offer = offer;
          this.mapService.zoomToPlace(this.offer.location);
        });
    });
  }

  ngOnInit() {
    document.querySelector('.offers').scrollTop = 0;
    this.applyCVForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onNavigateBack() {
    this.location.back();
    this.mapService.zoomOut();
  }

  onApply() {
    this.isInvalidForm = !this.applyCVForm.valid;
  }
}
