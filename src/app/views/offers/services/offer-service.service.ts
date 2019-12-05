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
      companyAddress: 'ul.Grunwaldzka 411, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['html', 'web', 'angular'],
      logoPath: 'js.svg',
      companySize: '40+',
      employmentType: 'Permanent',
      experienceLevel: 'Senior',
      description: '',
      techStack: [''],
      location:  [
        54.398873770682414,
        18.576722145080563
      ]
    }, {
      jobTitle: 'Scrum Master',
      tech: 'pm',
      salary: 'undisclosed salary',
      date: 'new',
      companyName: 'Blabla Company',
      companyAddress: 'Aleje Jerozolimskie 179, Warszawa',
      companyPlace: 'Warszawa',
      skills: ['english', 'scrum', 'teamwork'],
      logoPath: 'PM.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        52.212616276587575,
        20.952022075653073
      ]
    },
    {
      jobTitle: 'Agile Master',
      tech: 'pm',
      salary: 'undisclosed salary',
      date: 'new',
      companyName: 'Blabla Company',
      companyAddress: 'Ułańska 1, Poznań',
      companyPlace: 'Poznań',
      skills: ['english', 'agile', 'teamwork'],
      logoPath: 'PM.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        52.400847856747404,
        16.89559936523437
      ]
    }, {
      jobTitle: 'QA Business Analyst',
      tech: 'testing',
      salary: '2 000 - 5 000 PLN',
      date: 'new',
      companyName: 'Blabla Company',
      companyAddress: 'Aleja Grunwaldzka 472, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['manual testing', 'teamwork'],
      logoPath: 'testing.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Junior',
      description: '',
      techStack: [''],
      location: [
        54.4029582377175,
        18.571250438690186
      ]
    }, {
      jobTitle: 'Unity Developer',
      tech: 'game',
      salary: '7 000 - 13 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'Grabarska 2, Wrocław',
      companyPlace: 'Wrocław',
      skills: ['OOP', 'python', 'AWS'],
      logoPath: 'game.svg',
      companySize: '30+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        51.111228198516685,
        17.02503204345703
      ]
    }, {
      jobTitle: 'Java Developer',
      tech: 'java',
      salary: '12 000 - 15 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'Al. Józefa Piłsudskiego 6, Białystok',
      companyPlace: 'Białystok',
      skills: ['rest', 'spring', 'Java 8'],
      logoPath: 'java.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        53.13584264289898,
        23.15707683563232
      ]
    }, {
      jobTitle: 'Python Developer',
      tech: 'python',
      salary: '2 000 - 5 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: 'Lęborska 3B, Gdańsk',
      companyPlace: 'Gdańsk',
      skills: ['rest', 'django', 'python'],
      logoPath: 'python.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Junior',
      description: '',
      techStack: [''],
      location: [
        54.4057309468561,
        18.575735092163082
      ]
    },
    {
      jobTitle: 'QA Business Analyst',
      tech: 'testing',
      salary: '4 000 - 7 000 PLN',
      date: 'new',
      companyName: 'Company',
      companyAddress: 'Towarowa 20, Bydgoszcz',
      companyPlace: 'Bydgoszcz',
      skills: ['manual testing', 'teamwork'],
      logoPath: 'testing.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Junior',
      description: '',
      techStack: [''],
      location: [
        53.124693279514204,
        18.068604469299316
      ]
    },
    {
      jobTitle: 'Java Developer',
      tech: 'java',
      salary: '7 000 - 12 000 PLN',
      date: 'new',
      companyName: 'Blabla',
      companyAddress: '23 lutego 11, Poznań',
      companyPlace: 'Poznań',
      skills: ['java 8', 'java ee', 'spring'],
      logoPath: 'java.svg',
      companySize: '50',
      employmentType: 'Permanent',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        52.40976263747305,
        16.930704116821286
      ]
    },
    {
      jobTitle: 'Web Developer',
      tech: 'html',
      salary: 'undisclosed salary',
      date: '1d ago',
      companyName: 'Blabla Company',
      companyAddress: 'Żwirki i Wigury 93, Warszawa',
      companyPlace: 'Warszawa',
      skills: ['sass', 'react', 'js'],
      logoPath: 'html5.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        52.211275178206215,
        20.987191200256348
      ]
    },
    {
      jobTitle: 'Game Developer',
      tech: 'game',
      salary: '12 000 - 15 000',
      date: '3d ago',
      companyName: 'Company',
      companyAddress: 'Jagiellońska, 74, Warszawa',
      companyPlace: 'Warszawa',
      skills: ['oop', 'unity', 'english'],
      logoPath: 'html5.svg',
      companySize: '100+',
      employmentType: 'B2B',
      experienceLevel: 'Mid',
      description: '',
      techStack: [''],
      location: [
        52.26718564097962,
        21.020965576171875
      ]
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
