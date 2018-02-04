import { Component, OnInit } from '@angular/core';
import { ChatModel } from '../../models/chatModel'

import { SocialUser } from "angular4-social-login";
import { AuthService } from "angular4-social-login";
import { DataService } from '../../services/data.service';
import { SharingService } from '../../services/sharing.service';
import { UserModel } from '../../models/user';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.css']
})
export class ListchatComponent implements OnInit {
  chats: ChatModel[];

  userShared: UserModel;
  selectedChat: ChatModel;

  constructor(private authService: AuthService, private dataService: DataService, private sharing: SharingService) {
    this.sharing.currentMessage.subscribe(user => this.userShared = user)
   }

  ngOnInit() {
    this.chats = [];

  }

  OpenChat(chat) {
    this.selectedChat = chat;
  }

  GetOpenChat() {
    this.dataService.GetData(`${environment.UrlBase}/getchats?userid=${this.userShared.id}`)
    .subscribe(
      r => {

      },
      e => {
        console.error(e);
      }
    );
  }

}
