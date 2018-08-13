import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  show_messages = environment.show_messages;

  constructor(public messageService: MessageService) {
  }

  ngOnInit() {
  }

}
