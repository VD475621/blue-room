import { Component, OnInit } from '@angular/core';

import {DataService} from '../../services/data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  alluser: any;

  constructor(private dataService: DataService) { }

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

}
