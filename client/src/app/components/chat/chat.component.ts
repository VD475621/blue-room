import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChatModel } from '../../models/chatModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input()chat: ChatModel;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  GetMessage() {
    setInterval(() => { this.RefreshMessage(); }, 5000);
  }

  RefreshMessage(){
    this.dataService.GetData('').subscribe(r => { this.chat = r as ChatModel; });
  }

}
