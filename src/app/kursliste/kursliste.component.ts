import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MessageService} from '../message.service';
import {Kurs} from '../kurs';
import {Losverfahren} from '../losverfahren';
import {LosverfahrenService} from '../losverfahren.service';

@Component({
  selector: 'app-kursliste',
  templateUrl: './kursliste.component.html',
  styleUrls: ['./kursliste.component.css']
})
export class KurslisteComponent implements OnInit {

  losverfahren: Losverfahren;

  constructor(private route: ActivatedRoute,
    private losverfahrenService: LosverfahrenService,
    private messageService: MessageService) {
  }

  ngOnInit() {
    this.getLosverfahren();
  }

  getLosverfahren() {
    const id = this.route.snapshot.paramMap.get('id');
    this.losverfahrenService.getLosverfahren(id).subscribe(losverfahren =>
      this.losverfahren = losverfahren
    );
  }

  createKurs(name: string, plaetze: number) {
    this.log(`Erzeuge neuen Kurs ${name} mit ${plaetze} Plätzen`);
    if (this.losverfahren.kurse == null) {
      this.losverfahren.kurse = [];
    }
    this.losverfahren.kurse.push(new Kurs(name, plaetze));
    this.losverfahrenService.updateLosverfahren(this.losverfahren).subscribe(ret => this.getLosverfahren());
  }

  deleteKurs(id: string) {
    this.losverfahren.kurse = this.losverfahren.kurse.filter(k => k.id !== id);
    this.losverfahrenService.updateLosverfahren(this.losverfahren).subscribe(ret => this.getLosverfahren());
  }

  private log(message: string) {
    this.messageService.add(`KurslisteComponent: ${message}`);
  }

}
