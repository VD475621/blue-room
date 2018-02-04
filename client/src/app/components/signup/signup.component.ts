import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserModel } from '../../models/user';

import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: UserModel;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.user = new UserModel();
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
          this.dataService.PostData('', {
            username: this.user.username,
            password: this.user.password,
            email: this.user.email,
            isHelper: this.user.isHelper
          })
          .subscribe( r => {

          },
        e => {
          console.error(e);
        })
        }
      }
    }
  }

  DoesUsernameCanBeUse(username: string) : boolean {
    return true;
  }

}
