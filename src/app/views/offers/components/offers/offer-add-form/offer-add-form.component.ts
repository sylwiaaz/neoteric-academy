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
  @ViewChild('skillInput', { static: false }) skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  provider = new OpenStreetMapProvider();

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
  allTechnologies: any[];
  companyPlace: string;
  companyStreet: string;
  companyAddress: string;
  logoPath: string;
  location: any[];
  clickedSubmitBtn = false;
  chosenSkills: string[] = [];
  skillsControl = new FormControl(null);
  filteredSkillOptions: Observable<string[]>;

  offerAddForm: FormGroup;
  minSalControl;
  maxSalControl;
  currencyControl;

  constructor(private mapService: MapService,
              private filterService: FilterService,
              private offerService: OfferService) {
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
    this.offerAddForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      companySize: new FormControl(null, Validators.required),
      offerTitle: new FormControl(null, Validators.required),
      expLevel: new FormControl(null, Validators.required),
      empType: new FormControl(null, Validators.required),
      minSal: new FormControl(null, [
        Validators.min(200),
        Validators.pattern('^[0-9]+.$')]),
      maxSal: new FormControl(null, [Validators.pattern('^[0-9]+.$')]),
      currency: new FormControl(null),
      companyPlace: new FormControl(null, Validators.required),
      companyStreet: new FormControl(null, Validators.required),
      applyWay: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      remote: new FormControl(false),
      undisclosedSal: new FormControl(false)
    });
    this.minSalControl = this.offerAddForm.controls.minSal;
    this.maxSalControl = this.offerAddForm.controls.maxSal;
    this.currencyControl = this.offerAddForm.controls.currency;
  }

  minSalForMaxSal(): number {
    return this.minSalControl.value > 200 ? this.minSalControl.value : 200;
  }

  addSkillToChosenSkills(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        if (
          this.chosenSkills.length < 11 &&
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

  removeSkillFromChosenSkills(skill: string) {
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

  isRequiredIfSalTouched(inputName?: string) {
    this.disableCheckboxSal();
    if (inputName === 'currency') {
      if (!this.currencyControl.value && (this.minSalControl.touched && this.minSalControl.value || this.maxSalControl.touched &&
        this.maxSalControl.value)) {
        return true;
      }
    } else if (inputName === 'maxSal') {
      if (!this.maxSalControl.value && this.minSalControl.touched && this.minSalControl.value) {
        return true;
      }
    } else if (inputName === 'minSal') {
      if (!this.minSalControl.value && this.maxSalControl.touched && this.maxSalControl.value) {
        return true;
      }
    } else {
      return false;
    }
  }

  disableCheckboxSal() {
    if (this.maxSalControl.value || this.minSalControl.value) {
      this.offerAddForm.get('undisclosedSal').disable();
    } else {
      this.offerAddForm.get('undisclosedSal').enable();
    }
  }

  isInvalidSalaryValue() {
    if (this.maxSalControl.value <= this.minSalControl.value && this.maxSalControl.touched &&
      this.minSalControl.value > 0 && this.maxSalControl.value) {
      return true;
    }
    return false;
  }

  isActiveBtn(tech: string) {
    if (tech.toLowerCase() === this.selectedTech.toLowerCase()) {
      return 'active';
    } else if (tech.toLowerCase() !== this.selectedTech.toLowerCase() && this.selectedTech !== 'All') {
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
      this.companyAddress = `${this.companyStreet}, ${this.companyPlace}`;
      this.provider.search({ query: this.companyAddress }).then(result => {
        this.location = [Number(result[0].y), Number(result[0].x)];
        this.mapService.zoomToPlace(this.location);
        this.mapService.makeMarker(this.location);
      });
    }
  }

  setSalary() {
    const minSal = this.minSalControl.value;
    const maxSal = this.maxSalControl.value;
    const currency = this.currencyControl.value;
    if (minSal && maxSal && currency) {
      return `${minSal} - ${maxSal} ${currency}`;
    } else {
      return 'undisclosed salary';
    }
  }

  isTricity(place) {
    if (place === 'Gdańsk' || place === 'Gdynia' || place === 'Sopot') {
      return 'Trójmiasto';
    } else {
      return place;
    }
  }

  onPostOffer() {
    this.clickedSubmitBtn = true;
    if (this.offerAddForm.valid && this.selectedTech !== 'All' && this.chosenSkills.length !== 0) {
      const offerJob = {
        skills: this.chosenSkills,
        techStack: this.chosenSkills,
        location: this.location,
        jobTitle: this.offerAddForm.value.offerTitle,
        tech: this.selectedTech.toLowerCase(),
        salary: this.setSalary(),
        minSal: this.minSalControl.value ? this.minSalControl.value : 0,
        maxSal: this.maxSalControl.value ? this.maxSalControl.value : 51000,
        date: new Date(),
        companyName: this.offerAddForm.value.companyName,
        companyAddress: this.companyAddress,
        companyPlace: this.isTricity(this.companyPlace),
        logoPath: this.logoPath,
        companySize: this.offerAddForm.value.companySize,
        employmentType: this.offerAddForm.value.empType,
        experienceLevel: this.offerAddForm.value.expLevel,
        remote: String(this.offerAddForm.value.remote),
        premium: false,
        applyWay: this.offerAddForm.value.applyWay,
        description: this.offerAddForm.value.description
      };
      this.offerService.postJobOffer(offerJob);
    }
  }

  onChooseTech(tech) {
    this.selectedTech = tech.name;
    this.logoPath = tech.icon.split('/')[3];
  }
}
