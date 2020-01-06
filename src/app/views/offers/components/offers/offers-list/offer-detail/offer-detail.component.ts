import { Offer } from './../../../../services/offer.model';
import { MapService } from './../../../../services';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../../services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss', '../offers-list.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer: Offer;
  id: string;
  showMoreClauseInfo = false;
  displayFutureContsent = false;
  applyCVForm: FormGroup;
  isInvalidForm: boolean;
  errorMessage: string;
  isLoading = false;

  constructor(private offerService: OfferService,
              private router: Router,
              private route: ActivatedRoute,
              private mapService: MapService,
              private location: Location) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      const premium = params.premium;
      let getOfferFn;
      if (premium) {
        getOfferFn = this.offerService.getPremiumOffer(this.id);
      } else {
        getOfferFn = this.offerService.getOffer(this.id);
      }
      this.isLoading = true;
      getOfferFn.subscribe(offer => {
        this.isLoading = false;
        this.offer = offer;
        this.offerService.offersSubject.next([this.offer]);
        this.mapService.zoomToPlace(this.offer.location);
      }, error => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
        this.offerService.offersSubject.next([]);
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

  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
