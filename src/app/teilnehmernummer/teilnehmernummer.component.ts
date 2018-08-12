import {MessageService} from '../message.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchuelerlistenService} from '../schuelerlisten.service';

@Component({
  selector: 'app-teilnehmernummer',
  templateUrl: './teilnehmernummer.component.html',
  styleUrls: ['./teilnehmernummer.component.css']
})
export class TeilnehmernummerComponent implements OnInit {

  private losverfahrenId: string;

  constructor(private schuelerlistenService: SchuelerlistenService, private route: ActivatedRoute, private messageService: MessageService) {
  }

  ngOnInit() {
    this.losverfahrenId = this.route.snapshot.paramMap.get('id');
  }

  upload(files: File[]): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();

    this.log('uploading ' + files[0].name);
    formData.append('schuelerliste', files[0]);
    formData.append('losverfahrenId', this.losverfahrenId);

    this.schuelerlistenService.uploadAndGetSchuelerliste(formData).subscribe(
      res => this.log('finished')
    );
  }

  private log(message: string) {
    this.messageService.add(`TeilnehmernummerComponent: ${message}`);
  }

}
