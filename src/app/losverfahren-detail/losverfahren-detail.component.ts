import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LosverfahrenService} from '../losverfahren.service';
import {Losverfahren} from '../losverfahren';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-losverfahren-detail',
  templateUrl: './losverfahren-detail.component.html',
  styleUrls: ['./losverfahren-detail.component.css']
})
export class LosverfahrenDetailComponent implements OnInit {

  private losverfahrenId: string;
  losverfahren: Losverfahren;

  constructor(
    private route: ActivatedRoute,
    private losverfahrenService: LosverfahrenService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.losverfahrenId = this.route.snapshot.paramMap.get('id');
    this.getLosverfahren();
  }

  private getLosverfahren(): void {
    this.losverfahrenService.getLosverfahren(this.losverfahrenId)
      .subscribe(losverfahren => this.losverfahren = losverfahren);
  }

  updateLosverfahren(): void {
    this.log(`Setze Losverfahren ${this.losverfahren.name} auf aktiv=${this.losverfahren.aktiv}`);
    this.losverfahrenService.getLosverfahren(this.losverfahrenId)
      .subscribe(losverfahren => {
          losverfahren.aktiv = this.losverfahren.aktiv;
          this.losverfahrenService.updateLosverfahren(losverfahren).subscribe();
          this.losverfahren = losverfahren;
        }
      );
  }

  upload(files: File[]): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    this.log('uploading ' + files[0].name);
    formData.append('schuelerliste', files[0]);
    formData.append('losverfahrenId', '' + this.losverfahrenId);

    this.losverfahrenService.uploadAndGetResult(formData).subscribe(
      res => this.log('finished')
    );
  }

  private log(message: string) {
    this.messageService.add(`TeilnehmernummerComponent: ${message}`);
  }

}
