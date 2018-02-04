import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  alluser: any;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private dataService: DataService, private authService: AuthService, private route: Router) { }

  ngOnInit() {
    this.dataService.GetData('http://localhost:8081/users')
    .subscribe(
      r => {
        this.alluser = r;
      },
      e => {
        console.error(e);
      }
    );

    
  }

  UseFaceBook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.route.navigate(['/chat']);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
