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
    this.dataService.GetData(`${environment.UrlBase}/`)
    .subscribe(
      r => {

      },
      e => {
        console.error(e);
      }
    );
  }

  Login() {
    if (this.GoodUser) {
      this.route.navigate(['/chat']);
      const user = new UserModel;
      user.username = this.username;
      this.sharing.changeMessage(user);
    }
  }
  
  GoodUser(): boolean {
    return true;
  }

  UseFaceBook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.route.navigate(['/chat']);
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          const new_user = new UserModel;
          new_user.username = this.user.name;
          this.sharing.changeMessage(new_user);
        }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
