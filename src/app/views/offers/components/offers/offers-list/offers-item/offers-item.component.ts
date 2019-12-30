import { Component, OnInit, Input } from '@angular/core';
import { AppRouterUrls } from '../../../../../../app-routing.config';
import { Offer } from '../../../../services/offer.model';

@Component({
  selector: 'app-offers-item',
  templateUrl: './offers-item.component.html',
  styleUrls: ['./offers-item.component.scss']
})
export class OffersItemComponent implements OnInit {
  appRouterUrls = AppRouterUrls;

  @Input() offer: Offer;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
