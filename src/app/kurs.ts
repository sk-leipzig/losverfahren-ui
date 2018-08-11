import {Links2, Page} from './rest';

export class Kurs {
  id: string;
  name: string;
  klassenstufen: number[];
  plaetze: number;

  constructor(name: string, plaetze?: number) {
    this.name = name;
    this.klassenstufen = [];
    this.plaetze = plaetze;
  }
}

export interface Embedded {
  kurse: Kurs[];
}

export interface KursListe {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}
