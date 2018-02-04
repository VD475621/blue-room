import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { UserModel } from '../../models/user';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup-facebook',
  templateUrl: './signup-facebook.component.html',
  styleUrls: ['./signup-facebook.component.css']
})
export class SignupFacebookComponent implements OnInit {
  user: UserModel;
  password: string;
  confirm: string;

  constructor(private share: SharingService, private data: DataService, private router: Router) { 
    this.share.currentMessage.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  Signup(f: NgForm) {
    this.user.password = f.value.password;
    this.user.confirm_password = f.value.confirm_password;
    this.user.isHelper = f.value.isHelper;

    if (this.user.password !== '' && this.user.confirm_password !== '') {
      if (true) {
        if (this.user.password === this.user.confirm_password) {
          this.data.PostData(`${environment.UrlBase}/user`, {
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

}
