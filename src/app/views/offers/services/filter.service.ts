import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppRouterUrls } from '../../../app-routing.config';
import { OfferService } from './offer-service.service';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  appRouterUrls = AppRouterUrls;
  assetsPath = '../../../../../assets/images/';
  technologies = [
    {
      name: 'JS',
      icon: `${this.assetsPath}js.svg`,
      background: `linear-gradient(-90deg, #FFC706, #FFAF00)`
    },
    {
      name: 'HTML',
      icon: `${this.assetsPath}html5.svg`,
      background: `linear-gradient(-90deg, #FF7D50, #FD5D21)`
    },
    {
      name: 'PHP',
      icon: `${this.assetsPath}php.svg`,
      background: `linear-gradient(-90deg, #41ADFA, #157CFC)`
    },
    {
      name: 'Ruby',
      icon: `${this.assetsPath}ruby.svg`,
      background: `linear-gradient(-90deg, #ef5350, #f44336)`
    },
    {
      name: 'Python',
      icon: `${this.assetsPath}python.svg`,
      background: `linear-gradient(-90deg, #1F5EB6, #1F7BC4)`
    },
    {
      name: 'Java',
      icon: `${this.assetsPath}java.svg`,
      background: `linear-gradient(-90deg, #FA656B, #F9597A)`
    },
    {
      name: '.Net',
      icon: `${this.assetsPath}dotNet.png`,
      background: `linear-gradient(-90deg, #3FC5E6, #4FA4FD)`
    },
    {
      name: 'Scala',
      icon: `${this.assetsPath}scala.png`,
      background: `linear-gradient(-90deg, #F86468, #F1464C)`
    },
    {
      name: 'C++',
      icon: `${this.assetsPath}C++.svg`,
      background: `linear-gradient(-90deg, #2FCFBB, #37DD9C)`
    },
    {
      name: 'Mobile',
      icon: `${this.assetsPath}mobile.svg`,
      background: `linear-gradient(-90deg, #E04F86, #BA4A8D)`
    },
    {
      name: 'Testing',
      icon: `${this.assetsPath}testing.svg`,
      background: `linear-gradient(-90deg, #89DB54, #65AF35)`
    },
    {
      name: 'DevOps',
      icon: `${this.assetsPath}devops.png`,
      background: `linear-gradient(-90deg, #5266E1, #8166E0)`
    },
    {
      name: 'Game',
      icon: `${this.assetsPath}game.svg`,
      background: `linear-gradient(-90deg, #ff4081, #ec407a)`
    },
    {
      name: 'UX/UI',
      icon: `${this.assetsPath}UX.svg`,
      background: `linear-gradient(-90deg, #ffb74d, #ff9800)`
    }
  ];
  otherTechnologies = [
    {
      name: 'PM',
      icon: `${this.assetsPath}PM.svg`,
      background: `linear-gradient(-90deg, #80cbc4, #4db6ac)`
    },
    {
      name: 'Blockchain',
      icon: `${this.assetsPath}blockchain.svg`,
      background: `linear-gradient(-90deg, #AB47BC, #6A1B9A)`
    },
    {
      name: 'Security',
      icon: `${this.assetsPath}security.svg`,
      background: `linear-gradient(-90deg, #536DFE, #0D47A1)`
    },
    {
      name: 'Data',
      icon: `${this.assetsPath}data.svg`,
      background: `linear-gradient(-90deg, #009688, #00796B)`
    },
    {
      name: 'Golang',
      icon: `${this.assetsPath}golang.png`,
      background: `linear-gradient(-90deg, #6AD7E5, #6A8BE5)`
    },
    {
      name: 'SAP',
      icon: `${this.assetsPath}sap.svg`,
      background: `linear-gradient(-90deg, #02AFEB, #1B68C2)`
    },
    {
      name: 'Other',
      icon: `${this.assetsPath}devices.svg`,
      background: `linear-gradient(-90deg, #EC4CB6, #D44BD5)`
    }
  ];
  allTechnologies = [
    'All',
    ...this.technologies.map(tech => tech.name),
    ...this.otherTechnologies.map(tech => tech.name)
  ];

  places = [
    'All',
    'Warszawa',
    'Kraków',
    'Wrocław',
    'Poznań',
    'Trójmiasto',
    'World'
  ];
  otherPlaces = [
    'Białystok',
    'Bielsko-Biała',
    'Bydgoszcz',
    'Częstochowa',
    'Gliwice',
    'Katowice',
    'Kielce',
    'Lublin',
    'Łódź',
    'Olsztyn',
    'Opole',
    'Toruń',
    'Rzeszów',
    'Szczecin'
  ];
  allPlaces = [...this.places, ...this.otherPlaces];

  selectedPlace = 'All';
  selectedTech = 'All';
  selectedExp = 'all';
  selectedMinSal = '0k';
  selectedMaxSal = '51k';

  constructor(private router: Router, private offerService: OfferService) {
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        const urlParams = decodeURIComponent(this.router.url).split('/');

        // check if url is : '/offers/place/tech ..'
        if (urlParams[1] === 'offers' && urlParams[2] !== 'offer') {
          const [slashSeg, offerSegment, placeSeg, techSeg, expSeg, minSalSeg, maxSalSeg] = urlParams;
          if (urlParams.length === 2 && offerSegment === 'offers') {
            this.offerService.getOffers();
          }
          this.offerService.getOffersByFilter(placeSeg, techSeg, expSeg, minSalSeg, maxSalSeg);
          this.setFilters(placeSeg, techSeg, expSeg, minSalSeg, maxSalSeg);
        }
      }
    });
  }

  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  onNavigateByFilter() {
    if (this.router.url.includes('offers')) {
      if (this.selectedMaxSal === '51k') {
        if (this.selectedMinSal === '0k') {
          if (this.selectedExp.toLowerCase() === 'all') {
            if (this.selectedTech.toLowerCase() === 'all') {
              this.router.navigate([
                this.appRouterUrls.DEFAULT,
                this.selectedPlace.toLowerCase()
              ]);
            } else {
              this.router.navigate([
                this.appRouterUrls.DEFAULT,
                this.selectedPlace.toLowerCase(),
                this.selectedTech.toLowerCase()
              ]);
            }
          } else {
            this.router.navigate([
              this.appRouterUrls.DEFAULT,
              this.selectedPlace.toLowerCase(),
              this.selectedTech.toLowerCase(),
              this.selectedExp.toLowerCase()
            ]);
          }
        } else {
          this.router.navigate([
            this.appRouterUrls.DEFAULT,
            this.selectedPlace.toLowerCase(),
            this.selectedTech.toLowerCase(),
            this.selectedExp.toLowerCase(),
            this.selectedMinSal
          ]);
        }
      } else {
        this.router.navigate([
          this.appRouterUrls.DEFAULT,
          this.selectedPlace.toLowerCase(),
          this.selectedTech.toLowerCase(),
          this.selectedExp.toLowerCase(),
          this.selectedMinSal,
          this.selectedMaxSal
        ]);
      }
    }
  }

  setFilters(placeSeg?, techSeg?, expSeg?, minSalSeg?, maxSalSeg?) {
    this.selectedPlace = placeSeg ? this.capitalize(placeSeg) : 'All';
    this.selectedTech = techSeg ? this.capitalize(techSeg) : 'All';
    this.selectedExp = expSeg ? expSeg : 'all';
    this.selectedMinSal = minSalSeg ? minSalSeg : '0k';
    this.selectedMaxSal = maxSalSeg ? maxSalSeg : '51k';
  }

  onClearFilters() {
    this.router.navigateByUrl('/brands', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/offers']);
    });
  }
}
