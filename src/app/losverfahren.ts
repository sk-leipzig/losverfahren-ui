import {Kurs} from './kurs';
import {Links2, Page} from './rest';

export class Losverfahren {
  id: number;
  name: string;
  aktiv: boolean;
  kurse: Kurs[];

  constructor(id: number, name: string) {
    this.id = id;
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
