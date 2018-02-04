import { Component, OnInit } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { UserModel } from '../../models/user';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  usershared: UserModel;
  roomName: string;

  constructor(private sharingService: SharingService, private router: Router, private dataService: DataService) 
  { 
    this.sharingService.currentMessage.subscribe(user => this.usershared = user);
  }

  ngOnInit() {

  }

  createDemande(f: NgForm) {
    this.router.navigate(['/chat/']);
    this.sharingService.ChangeRoom(f.value.room);
  }

  GetDemande() {
    this.dataService.GetData('')
    .subscribe();
  }
}
