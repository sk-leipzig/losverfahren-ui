import {Links2, Page} from './rest';
import {Schueler} from './schueler';

export interface Schuelerliste {
  losverfahrenId: string;
  schuelerListe: Schueler[];
}

export interface Embedded {
  schuelerlisten: Schuelerliste[];
}

export interface Schuelerlisten {
  _embedded: Embedded;
  _links: Links2;
  page: Page;
}
