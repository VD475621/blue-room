import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserModel } from '../../models/user';

import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SharingService } from '../../services/sharing.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  f: NgForm
  user: UserModel;
  constructor(private dataService: DataService, private router: Router, private share: SharingService) { 
  }

  ngOnInit() {
    
  }

  Signup(f: NgForm) {
    this.user.username = f.value.username;
    this.user.email = f.value.email;
    this.user.password = f.value.password;
    this.user.confirm_password = f.value.confirm_password;
    this.user.isHelper = f.value.isHelper;

    if (this.user.email !== '' && this.user.username !== '' && this.user.password !== '' && this.user.confirm_password !== '') {
      if (this.DoesUsernameCanBeUse(this.user.username)) {
        if (this.user.password === this.user.confirm_password) {
          this.dataService.PostData(`${environment.UrlBase}/user`, {
            username: this.user.username,
            password: this.user.password,
            email: this.user.email,
            ishelper: this.user.isHelper
          })
          .subscribe( r => {
            this.router.navigate(['login']);
          },
          e => {
            console.error(e);
            alert('Echec de l\'inscription!');
          });
        }
      }
    }
  }

  DoesUsernameCanBeUse(username: string) : boolean {
    return true;
  }

}
