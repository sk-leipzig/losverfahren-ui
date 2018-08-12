import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MessageService} from '../message.service';
import {Losverfahren} from '../losverfahren';
import {LosverfahrenService} from '../losverfahren.service';
import {SchuelerauswahlService, SchuelerUndLosverfahren} from '../schuelerauswahl.service';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {SchuelerAuswahl} from '../schuelerAuswahl';

@Component({
  selector: 'app-schuelerauswahl',
  templateUrl: './schuelerauswahl.component.html',
  styleUrls: ['./schuelerauswahl.component.css']
})
export class SchuelerauswahlComponent implements OnInit {
  losverfahren: Losverfahren;
  @Input() auswahl1: string;
  @Input() auswahl2: string;
  @Input() auswahl3: string;
  private schuelerUndLosverfahren$: Observable<SchuelerUndLosverfahren>;
  private schuelerAuswahl: SchuelerAuswahl;

  private searchTerms = new Subject<string>();

  constructor(private losverfahrenService: LosverfahrenService,
              private schuelerauswahlService: SchuelerauswahlService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.schuelerUndLosverfahren$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((kennung: string) => this.schuelerauswahlService.getLosverfahrenForKennung(kennung)),
    );
    this.schuelerUndLosverfahren$.subscribe(schuelerUndLosverfahren => {
      this.losverfahren = schuelerUndLosverfahren.losverfahren;
      this.schuelerAuswahl = new SchuelerAuswahl(schuelerUndLosverfahren.schueler);
    });
  }

  absenden() {
    this.schuelerAuswahl.auswahl = [this.auswahl1, this.auswahl2, this.auswahl3];
    this.schuelerauswahlService.updateSchuelerAuswahl(this.schuelerAuswahl).subscribe(
      response => {
        this.losverfahren = null;
        this.schuelerAuswahl = null;
        this.auswahl1 = null;
        this.auswahl2 = null;
        this.auswahl3 = null;
        window.alert('Deine Wünsche wurden gespeichert. Viel Glück!');
      }
    );
  }

  suche(kennung: string) {
    this.searchTerms.next(kennung);
  }

  private log(message: string) {
    this.messageService.add(`SchuelerauswahlComponent: ${message}`);
  }
}
