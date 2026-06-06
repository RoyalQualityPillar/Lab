import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wsr-module-admin',
  standalone: false,
  templateUrl: './wsr-module-admin.component.html',
  styleUrl: './wsr-module-admin.component.scss'
})
export class WsrModuleAdminComponent {
constructor(private router: Router) { }

  onFieldMaster() {
    this.router.navigate(['./rqplabui/lims-spc/field-master-home-page'])
  }
  onWorksheetFieldsMaster() {
    this.router.navigate(['./rqplabui/lims-spc/ws-master-home-page'])
  }

  onallStagesRecord(): void {
    this.router.navigate(['./rqplabui/dms/allstagesrecord']);
  }

  onWSRCompletedRecords(): void {
    this.router.navigate(['./rqplabui/lims-sm/wsr-completed']);
  }

  
}
