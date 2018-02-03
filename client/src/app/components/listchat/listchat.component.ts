import { Component, OnInit } from '@angular/core';
import { ChatModel } from '../../models/chatModel'

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.css']
})
export class ListchatComponent implements OnInit {
  chats: ChatModel[];
  constructor() { }

  ngOnInit() {
    this.chats = [];
    this.chats.push(new ChatModel);
    this.chats.push(new ChatModel);
    this.chats.push(new ChatModel);
    this.chats.push(new ChatModel);
  }

}
