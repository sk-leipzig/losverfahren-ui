import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LosverfahrenService} from '../losverfahren.service';
import {MessageService} from '../message.service';
import {Losverfahren} from '../losverfahren';
import {SchuelerlistenService} from '../schuelerlisten.service';
import {SchuelerauswahlService} from '../schuelerauswahl.service';

@Component({
  selector: 'app-losverfahren-liste',
  templateUrl: './losverfahren-liste.component.html',
  styleUrls: ['./losverfahren-liste.component.css']
})
export class LosverfahrenListeComponent implements OnInit {

  losverfahrenListe: Losverfahren[];

  constructor(private losverfahrenService: LosverfahrenService,
              private schuelerlistenService: SchuelerlistenService,
              private schuelerauswahlService: SchuelerauswahlService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.getLosverfahren();
  }

  getLosverfahren() {
    this.losverfahrenService.getAllLosverfahren().subscribe(losverfahrenListe => this.losverfahrenListe = losverfahrenListe);
  }

  createLosverfahren(name: string) {
    this.losverfahrenService.getAllLosverfahren().subscribe(losverfahrenListe => {
      let newId = 1;
      while (losverfahrenListe.find(losverfahren => losverfahren.id === newId)) {
        newId++;
      }
      this.losverfahrenService.createLosverfahren(new Losverfahren(newId, name)).subscribe(ret =>
        this.getLosverfahren());
    });
  }


  deleteLosverfahren(id: number) {
    this.losverfahrenService.deleteLosverfahren(id).subscribe(ret => {
      this.getLosverfahren();
    });
    this.schuelerlistenService.deleteSchuelerlisten(id).subscribe();
    this.schuelerauswahlService.deleteSchuelerAuswahl(id).subscribe();
  }
}
