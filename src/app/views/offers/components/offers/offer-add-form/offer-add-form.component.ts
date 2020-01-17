import { OfferService } from './../../../services/offer-service.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, FilterService } from '../../../services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatChipInputEvent,
  MatAutocompleteSelectedEvent
} from '@angular/material';
import { OpenStreetMapProvider } from 'leaflet-geosearch';


@Component({
  selector: 'app-offer-add-form',
  templateUrl: './offer-add-form.component.html',
  styleUrls: [
    './offer-add-form.component.scss',
    '../offers-filter/offers-filter.component.scss'
  ]
})
export class OfferAddFormComponent implements OnInit {
  skills: string[] = [
    'C',
    'Jetty',
    'ES7',
    'JavaScript',
    'Java',
    'PHP',
    'C#',
    'Python',
    '.Net',
    'Spring',
    'SQL',
    'C++',
    'AngularJS',
    'Angular',
    'React',
    'ReactJS',
    'Web Applications',
    'HTML',
    'Ruby',
    'Scrum',
    'ASP.NET',
    'Linux',
    'iOS',
    'Django',
    'Testing',
    'AWS',
    'Android',
    'CSS',
    'Symfony',
    'Unix',
    'Mobile',
    'Java 8',
    'Scala',
    'Ruby on Rails',
    'Node.js',
    'Selenium',
    'Git',
    'DevOps',
    'Hibernate',
    'Laravel'
  ];
  selectedTech: any = 'All';
  logoPath;
  allTechnologies: any[];
  companyPlace;
  companyStreet;
  companyAddress;
  location;
  clickedSubmitBtn = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chosenSkills: string[] = [];
  skillsControl = new FormControl(null);
  maxSal;
  filteredSkillOptions: Observable<string[]>;
  provider = new OpenStreetMapProvider();

  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  offerAddForm: FormGroup;

  constructor(
    private mapService: MapService,
    private filterService: FilterService,
    private offerService: OfferService
  ) {
    this.filteredSkillOptions = this.skillsControl.valueChanges.pipe(
      startWith(''),
      map(value => (value ? this._filter(value) : this.skills.slice()))
    );
  }

  ngOnInit() {
    this.mapService.initMap();
    this.allTechnologies = [
      ...this.filterService.technologies,
      ...this.filterService.otherTechnologies
    ];

    this.maxSal = new FormControl(null, [Validators.pattern('^[0-9]+\.$')]),


      this.offerAddForm = new FormGroup({
        companyName: new FormControl(null, Validators.required),
        companySize: new FormControl(null, Validators.required),
        offerTitle: new FormControl(null, Validators.required),
        expLevel: new FormControl(null, Validators.required),
        empType: new FormControl(null, Validators.required),
        minSal: new FormControl(null, [Validators.min(200), Validators.pattern('^[0-9]+\.$')]),
        maxSal: this.maxSal,
        currency: new FormControl(null),
        companyPlace: new FormControl(null, Validators.required),
        companyStreet: new FormControl(null, Validators.required),
        applyWay: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
        remote: new FormControl(null),
        undisclosedSal: new FormControl(null)
      });
  }

  disableCheckbox() {
    if (this.offerAddForm.get('minSal').value > 200) {
      return true;
    }
    return false;
  }

  disableSalInput() {
    if (this.offerAddForm.get('undisclosedSal').value === true) {
      return true;
    }
    return false;
  }


  minSalForMaxSal(): number {
    return this.offerAddForm.get('minSal').value > 200 ? this.offerAddForm.get('minSal').value : 200;
  }

  addSkillToChosenSkills(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if (
          this.chosenSkills.length < 6 &&
          !this.chosenSkills.includes(value.trim())
        ) {
          this.chosenSkills.push(value.trim());
        }
      }
      if (input) {
        input.value = '';
      }
      this.skillsControl.setValue(null);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chosenSkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillsControl.setValue(null);
  }

  removeSkillFromChosenSkills(skill) {
    const index = this.chosenSkills.indexOf(skill);

    if (index >= 0) {
      this.chosenSkills.splice(index, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  isInvalidSkillControl() {
    if (this.chosenSkills.length === 0 && (this.clickedSubmitBtn || this.skillsControl.touched)) {
      return true;
    } else {
      return false;
    }
  }

  isRequiredIfSalTouched(inputName?) {
    // console.log(event);
    // if (inputId === "mat-input-6") {}
    const maxSalControl = this.offerAddForm.get('maxSal');
    const minSalControl = this.offerAddForm.get('minSal');
    const currencyControl = this.offerAddForm.get('currency');

    if (!currencyControl.value && (maxSalControl.touched || minSalControl.touched) && (maxSalControl.value || minSalControl.value)) {
      if (inputName === 'minSal') {
        return false;
      }
      return true;
    }
    return false;
  }

  isInvalidSalary() {
    const maxSalControl = this.offerAddForm.get('maxSal');
    if (maxSalControl.value <= this.offerAddForm.value.minSal && maxSalControl.touched) {
      return true;
    }
    return false;
  }

  isActiveBtn(tech) {
    if (tech.toLowerCase() === this.selectedTech.toLowerCase()) {
      return 'active';
    } else if (
      tech.toLowerCase() !== this.selectedTech.toLowerCase() &&
      this.selectedTech !== 'All'
    ) {
      return 'inactive';
    }
  }

  onNavigate(event) {
    if (event.target.placeholder === 'Office city *') {
      this.companyPlace = event.target.value;
    }
    if (event.target.placeholder === 'Office street / Business center *') {
      this.companyStreet = event.target.value;
    }
    if (this.companyStreet && this.companyPlace) {
      this.companyAddress = `${this.companyStreet}; ${this.companyPlace}`;
      this.provider.search({ query: this.companyAddress }).then(result => {
        this.location = [result[0].y, result[0].x];
        this.mapService.zoomToPlace(this.location);
        this.mapService.makeMarker(this.location);
      });
    }
  }

setSalary() {
  const minSal = this.offerAddForm.value.minSal;
  const maxSal = this.offerAddForm.value.maxSal;
  const currency = this.offerAddForm.value.currency;
  console.log(currency);
  if (minSal && maxSal && currency) {
    return `${minSal} - ${maxSal} ${currency}`;
  }  else {
    return 'undisclosed salary';
  }
}

  onPostOffer() {
    this.clickedSubmitBtn = true;
    if (this.offerAddForm.valid) {

      const offerJob = {
        skills: this.chosenSkills,
        techStack: this.chosenSkills,
        location: this.location,
        jobTitle: this.offerAddForm.value.offerTitle,
        tech: this.selectedTech.toLowerCase(),
        salary: this.setSalary(),
        minSal: this.offerAddForm.value.minSal ? this.offerAddForm.value.minSal : 0,
        maxSal: this.offerAddForm.value.maxSal ? this.offerAddForm.value.maxSal : 51000,
        date: new Date(),
        companyName: this.offerAddForm.value.companyName,
        companyAddress: this.companyAddress,
        companyPlace: this.companyPlace,
        logoPath: this.logoPath,
        companySize: this.offerAddForm.value.companySize,
        employmentType: this.offerAddForm.value.empType,
        experienceLevel: this.offerAddForm.value.expLevel,
        remote: String(this.offerAddForm.value.remote),
        premium: false,
        applyWay: this.offerAddForm.value.applyWay,
        description: this.offerAddForm.value.description
      };
      console.log(offerJob);
      this.offerService.postJobOffer(offerJob);
    }
    console.log(this.offerAddForm);
  }

  onChooseTech(tech) {
    this.selectedTech = tech.name;
    this.logoPath = tech.icon.split('/')[3];
  }
}
