import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user';
import { SharingService } from '../../services/sharing.service';
import { NgModel } from '@angular/forms/src/directives/ng_model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user_signin: UserModel;
  
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private dataService: DataService, private authService: AuthService, private route: Router, private sharing: SharingService) { }

  ngOnInit() {
   
  }

  Login(f: NgModel) {
    this.email = f.value.email;
    this.password = f.value.password;
    if (this.GoodUser) {
      const user = new UserModel;
      user.email = this.email;
      user.password = this.password;
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
    let resp : boolean;

    this.dataService.PostData(`${environment.UrlBase}/login`, {email: this.email, password: this.password})
    .subscribe(
      r => {
        resp = r;
       // this.user_signin = r as UserModel;
      },
      e => {
        console.error(e);
      }
    )
    
    return resp;
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
          new_user.email = user.email;
          this.sharing.changeMessage(new_user);
          this.route.navigate(['signup_fb']);
        }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
