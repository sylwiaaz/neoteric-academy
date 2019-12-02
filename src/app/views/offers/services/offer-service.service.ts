import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offers = [
    {
      jobTitle: 'JavaScript Developer',
      tech: 'js',
      salary: '10 000 - 15 000 PLN',
      date: 'new',
      companyName: 'Famous Company',
      companyAddress: 'ul.Jakaś 80, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['html', 'web', 'angular'],
      logoPath: '../../../../../../assets/images/html5.svg',
      companySize: '40+',
      employmentType: 'Permanent',
      experienceLevel: 'Senior',
      description: '',
      techStack: [''],
      location: ''
    }, {
      jobTitle: 'Scrum Master',
      tech: 'pm',
      salary: 'undisclosed salary',
      date: 'new',
      companyName: 'Blabla Company',
      companyAddress: 'ul.Jakaś 80, Warszawa',
      companyPlace: 'Warszawa',
      skills: ['english', 'scrum', 'teamwork'],
      logoPath: '../../../../../../assets/images/PM.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: ''
    }, {
      jobTitle: 'QA Business Analyst',
      tech: 'testing',
      salary: '2 000 - 5 000 PLN',
      date: 'new',
      companyName: 'Blabla Company',
      companyAddress: 'Jakaś 80, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['manual testing', 'teamwork'],
      logoPath: '../../../../../../assets/images/testing.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Junior',
      description: '',
      techStack: [''],
      location: ''
    }, {
      jobTitle: 'Unity Developer',
      tech: 'game',
      salary: '7 000 - 13 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'ul.Jakaś 80; Wrocław',
      companyPlace: 'Wrocław',
      skills: ['OOP', 'python', 'AWS'],
      logoPath: '../../../../../../assets/images/game.svg',
      companySize: '30+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: ''
    }, {
      jobTitle: 'Java Developer',
      tech: 'java',
      salary: '12 000 - 15 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'ul.Jakaś 80, Białystok',
      companyPlace: 'Białystok',
      skills: ['rest', 'spring', 'Java 8'],
      logoPath: '../../../../../../assets/images/java.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: ''
    }, {
      jobTitle: 'Python Developer',
      tech: 'python',
      salary: '2 000 - 5 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'ul.Jakaś 80, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['rest', 'django', 'python'],
      logoPath: '../../../../../../assets/images/python.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Junior',
      description: '',
      techStack: [''],
      location: ''
    },
    {
      jobTitle: 'Java Developer',
      tech: 'java',
      salary: '7 000 - 12 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'ul.Czarna 80, Poznań',
      companyPlace: 'Poznań',
      skills: ['java 8', 'java ee', 'spring'],
      logoPath: '../../../../../../assets/images/java.svg',
      companySize: '50',
      employmentType: 'Permanent',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: ''
    },
    {
      jobTitle: 'Web Developer',
      tech: 'html',
      salary: 'undisclosed salary',
      date: '1d ago',
      companyName: 'Blabla Company',
      companyAddress: 'ul.Jakaś 80, Warszawa',
      companyPlace: 'Warszawa',
      skills: ['sass', 'react', 'js'],
      logoPath: '../../../../../../assets/images/html5.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: ''
    }
  ];
  constructor() { }
  getOffers() {
    return this.offers.slice();
  }

  getOffer(index: number ) {
    return this.offers[index];
  }
}
