import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LosverfahrenService} from '../losverfahren.service';
import {Losverfahren} from '../losverfahren';

@Component({
  selector: 'app-losverfahren-detail',
  templateUrl: './losverfahren-detail.component.html',
  styleUrls: ['./losverfahren-detail.component.css']
})
export class LosverfahrenDetailComponent implements OnInit {

  losverfahren: Losverfahren;

  constructor(
    private route: ActivatedRoute,
    private losverfahrenService: LosverfahrenService
  ) {}

  ngOnInit(): void {
    this.getLosverfahren();
  }

  getLosverfahren(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.losverfahrenService.getLosverfahren(id)
      .subscribe(losverfahren => this.losverfahren = losverfahren);
  }

}
