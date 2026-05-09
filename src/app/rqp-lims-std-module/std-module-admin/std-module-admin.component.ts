import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-std-module-admin',
  standalone: false,
  templateUrl: './std-module-admin.component.html',
  styleUrl: './std-module-admin.component.scss'
})
export class StdModuleAdminComponent {

   constructor(private router: Router) { }

  onSampleRegestration() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-regestration'])
  }
  onSampleTestPlan() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-text-plan'])
  }
  onWSLotRecord() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-text-plan'])
  }
  onWSLotPuritiesRecord() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-text-plan'])
  }
  onWSLotContainersRecord() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-text-plan'])
  }
  onWSLotContainersUsage() {
    this.router.navigate(['./rqplabui/lims-std/home-page-sample-text-plan'])
  }
}
