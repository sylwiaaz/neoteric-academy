import { Component, OnInit, Input } from '@angular/core';
import { AppRouterUrls } from '../../../../../app-routing.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-item',
  templateUrl: './offers-item.component.html',
  styleUrls: ['./offers-item.component.scss']
})
export class OffersItemComponent implements OnInit {
  appRouterUrls = AppRouterUrls;

  @Input() offer;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
