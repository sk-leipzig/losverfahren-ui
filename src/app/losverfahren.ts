import {Kurs} from './kurs';
import {Links2, Page} from './rest';

export class Losverfahren {
  id: string;
  name: string;
  kurse: Kurs[];

  constructor(name: string) {
    this.name = name;
    this.kurse = [];
  }
}

export interface Embedded {
  losverfahren: Losverfahren[];
}

export interface LosverfahrenListe {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}
