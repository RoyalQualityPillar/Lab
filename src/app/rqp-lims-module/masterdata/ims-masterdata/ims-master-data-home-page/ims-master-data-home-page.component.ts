import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ims-master-data-home-page',
  standalone: false,
  templateUrl: './ims-master-data-home-page.component.html',
  styleUrl: './ims-master-data-home-page.component.scss'
})
export class ImsMasterDataHomePageComponent {

  constructor(private router: Router) { }

  onInstrumentCategory() {
    this.router.navigate(['./rqplabui/lims/instrument-cat-home-page'])
  }
  onInstrumentMaster() {
    this.router.navigate(['./rqplabui/lims/instrument-master-home-page'])
  }
  onCalibrationSchedule() {
    this.router.navigate(['./rqplabui/lims/calibration-sch-home-page'])
  }
  onCalibrationFrequency() {
    this.router.navigate(['./rqplabui/lims/calibration-freq-home-page'])
 }

  onCalibrationRecordSchedule() {
    this.router.navigate(['./rqplabui/lims/calibration-rec-sch-home-page'])
  }
  onSampleSetMaster() {
    this.router.navigate(['./rqplabui/lims/sample-set-master-home-page'])
  }
  onSampleRunMaster() {
    this.router.navigate(['./rqplabui/lims/sample-run-master-home-page'])
  }

  onMethodMaster() {
    this.router.navigate(['./rqplabui/lims/method-master-home-page'])
  }
  onUserMaster() {
    this.router.navigate(['./rqplabui/lims/user-master-home-page'])
  }
  onEvenLogMaster() {
    this.router.navigate(['./rqplabui/lims/even-log-master-home-page'])
  }
  onInstrumentStatusMaster() {
    this.router.navigate(['./rqplabui/lims/home-page-instrument-status'])
  }
  onCalibraionPerameterMaster(){
    this.router.navigate(['./rqplabui/lims/cpm-home-page'])
  }
  onPreventiveMaintenanceSchedule(){
    this.router.navigate(['./rqplabui/lims/home-page-prevnt-main-sche'])
  }
   onCalibraionUOMMaster() {
    this.router.navigate(['./rqplabui/lims/cum-home-page']);
  }
}

