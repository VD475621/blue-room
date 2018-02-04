import { Component, OnInit } from '@angular/core';
import { ChatModel } from '../../models/chatModel'

import { SocialUser } from "angular4-social-login";
import { AuthService } from "angular4-social-login";
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.css']
})
export class ListchatComponent implements OnInit {
  chats: ChatModel[];

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.chats = [];


    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  GetOpenChat() {

  }

}
