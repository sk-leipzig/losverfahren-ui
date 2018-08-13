import {Schueler} from './schueler';

export class SchuelerAuswahl {
  losverfahrenId: number;
  schueler: Schueler;
  auswahl: string[];

  constructor(losverfahrenId: number, schueler: Schueler) {
    this.losverfahrenId = losverfahrenId;
    this.schueler = schueler;
  }
}
