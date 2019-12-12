import { MapService } from './../../../../services';
import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../../../services';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppRouterUrls } from '../../../../../../app-routing.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit {
  offer;
  id: number;
  appRouterUrls = AppRouterUrls;
  showMoreClauseInfo = false;
  displayFutureContsent = false;
  applyCVForm: FormGroup;
  isInvalidForm: boolean;
  constructor(private offerService: OfferService,
              private router: Router,
              private route: ActivatedRoute,
              private mapService: MapService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.offer = this.offerService.getOffer(this.id);
      }
    );
    this.mapService.zoomToPlace(this.offer.location);
    document.querySelector('.offers').scrollTop = 0;

    this.applyCVForm = new FormGroup( {
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,
    Validators.email])
    });
  }

  onNavigateBack() {
    this.router.navigate([''], {relativeTo: this.route});
    this.mapService.zoomOut();
  }

  onApply() {
    console.log(this.applyCVForm);
    this.isInvalidForm =  !this.applyCVForm.valid;
  }
}
