import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChatModel } from '../../models/chatModel';
import { UserModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../services/chat.service';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input()chat: ChatModel;
  userShared: UserModel;
  roomShared: string;
  
  message: string;
  messages: string[] = [];

  constructor(private dataService: DataService, private chatService: ChatService, private sharingService: SharingService) 
  {
    this.sharingService.currentMessage.subscribe(user => this.userShared = user);
    this.sharingService.roomCurrent.subscribe(r => this.roomShared = r);
  }

  sendMessage() {
    this.chatService.sendMessage(this.userShared.username + ' : ' +this.message);
    this.message = '';

  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
      this.chatService.EnterRoom({user: `${this.userShared.username}`, chatroom: this.roomShared});
  }

  ngOnDestroy() {
    this.chatService.QuitRoom(this.userShared.username);
  }
}
