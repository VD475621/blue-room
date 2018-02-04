import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user';
import { SharingService } from '../../services/sharing.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private dataService: DataService, private authService: AuthService, private route: Router, private sharing: SharingService) { }

  ngOnInit() {
   
  }

  Login() {
    if (this.GoodUser) {
      const user = new UserModel;
      user.username = this.username;
      user.isHelper = this.IsHelper();
      this.sharing.changeMessage(user);
      
      if (user.isHelper) {
        this.route.navigate(['/demande_aide']);
      } else {
        this.route.navigate(['/demande']);
      }
    }
  }
  
  GoodUser(): boolean {
    return true;
  }

  IsHelper(): boolean {
    return true;
  }

  UseFaceBook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          const new_user = new UserModel;
          new_user.username = this.user.name;
          new_user.isHelper = this.IsHelper();
          this.sharing.changeMessage(new_user);
          
          if (new_user.isHelper) {
            this.route.navigate(['/demande_aide']);
          } else {
            this.route.navigate(['/demande']);
          }
        }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
