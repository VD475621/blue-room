import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DemandeModel } from '../../models/demande';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-listdemande',
  templateUrl: './listdemande.component.html',
  styleUrls: ['./listdemande.component.css']
})
export class ListdemandeComponent implements OnInit {

  listDemande: DemandeModel[];

  constructor(private dataService: DataService, private router: Router, private share: SharingService) { }

  ngOnInit() {
    this.listDemande = [];
  }


  GetAllDemande() {
    this.dataService.GetData(`${environment.UrlBase}/demandes`)
    .subscribe(
      r => {
        this.listDemande = r;
      }, 
      e => { 
        console.error(e);
      }
    );
  }

  GoToDemande(demande) {
    this.share.ChangeRoom(demande.room);
    this.router.navigate(['/chat']);
  }
}
