import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChatModel } from '../../models/chatModel';
import { UserModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input()chat: ChatModel;
  otheruser: UserModel;


  constructor(private dataService: DataService, private chatService: ChatService) { }

  ngOnInit() {
  }

  GetOtherUser() {
    this.dataService.GetData(`${environment.UrlBase}`)
    .subscribe(r => {}, e => {console.error(e);});
  }

  GetMessage() {
    setInterval(() => { this.RefreshMessage(); }, 5000);
  }

  RefreshMessage(){
    this.dataService.GetData('').subscribe(r => { this.chat = r as ChatModel; });
  }

}
