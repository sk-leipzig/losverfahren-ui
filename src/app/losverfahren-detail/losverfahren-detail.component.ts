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

  losverfahren: Losverfahren;

  constructor(
    private route: ActivatedRoute,
    private losverfahrenService: LosverfahrenService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getLosverfahren();
  }

  upload(files: File[]): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    this.log('uploading ' + files[0].name);
    formData.append('schuelerliste', files[0]);
    formData.append('losverfahrenId', '' + this.losverfahren.id);

    this.losverfahrenService.uploadAndGetResult(formData).subscribe(
      res => this.log('finished')
    );
  }

  updateLosverfahren(): void {
    this.losverfahrenService.updateLosverfahren(this.losverfahren).subscribe();
  }

  getLosverfahren(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.losverfahrenService.getLosverfahren(id)
      .subscribe(losverfahren => this.losverfahren = losverfahren);
  }

  private log(message: string) {
    this.messageService.add(`TeilnehmernummerComponent: ${message}`);
  }

}
