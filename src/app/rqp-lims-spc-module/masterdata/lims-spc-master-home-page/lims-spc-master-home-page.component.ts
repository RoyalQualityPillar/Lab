import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lims-spc-master-home-page',
  standalone: false,
  templateUrl: './lims-spc-master-home-page.component.html',
  styleUrl: './lims-spc-master-home-page.component.scss'
})
export class LimsSpcMasterHomePageComponent {

  constructor(private router: Router) { }

  onFieldMaster() {
    this.router.navigate(['./rqpquailtyui/lims-spc/field-master-home-page'])
  }
  onWorksheetFieldsMaster() {
    this.router.navigate(['./rqpquailtyui/lims-spc/ws-master-home-page'])
  }

  onallStagesRecord(): void {
    this.router.navigate(['./rqpquailtyui/dms/allstagesrecord']);
  } 

  
}
