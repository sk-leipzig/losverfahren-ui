import {Schueler} from './schueler';

export class SchuelerAuswahl {
  schueler: Schueler;
  auswahl: string[];

  constructor(schueler: Schueler) {
    this.schueler = schueler;
  }
}
