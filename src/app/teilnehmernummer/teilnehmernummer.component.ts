import {MessageService} from '../message.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
};

@Component({
  selector: 'app-teilnehmernummer',
  templateUrl: './teilnehmernummer.component.html',
  styleUrls: ['./teilnehmernummer.component.css']
})
export class TeilnehmernummerComponent implements OnInit {

  private losverfahrenId: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private messageService: MessageService) {}

  ngOnInit() {
    this.losverfahrenId = this.route.snapshot.paramMap.get('id');
  }

  upload(files: File[]): void {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    const url = 'http://localhost:8080/schuelerlisten';

    this.log('uploading ' + files[0].name);
    formData.append('file', files[0]);
    formData.append('losverfahrenId', this.losverfahrenId);

    this.log(`sending POST data to ${url}`);

    this.http.post(url, formData)
      .subscribe(res => this.log('response: ' + JSON.stringify(res)));
    this.log('finished');
  }

  private log(message: string) {
    this.messageService.add(`TeilnehmernummerComponent: ${message}`);
  }

}
