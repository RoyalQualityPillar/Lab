import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stm-module-admin',
  standalone: false,
  templateUrl:'./stm-module-admin.component.html',
  styleUrl: './stm-module-admin.component.scss'
})
export class StmModuleAdminComponent {
   constructor(private router: Router) { }
  onStorageCategoryMaster() {
    this.router.navigate(['./rqplabui/lims-stm/storage-category-master-home-page'])
  }
  onChambersMaster() {
    this.router.navigate(['./rqplabui/lims-stm/chambers-master-home-page'])
  }
<<<<<<< HEAD
  onStudyTypeMaster() {
    this.router.navigate(['./rqplabui/lims-stm/study-type-master-home-page'])
  }
    onStorageConditionMaster() {
    this.router.navigate(['./rqplabui/lims-stm/storage-conditio-master-home-page'])
  }
      onChambersTypeMaster() {
    this.router.navigate(['./rqplabui/lims-stm/chambers-type-master-home-page'])
  }
  onChambersRacksMaster() {
    this.router.navigate(['./rqplabui/lims-stm/chambers-racks-master-home-page'])
  }
  onChambersShellMaster() {
    this.router.navigate(['./rqplabui/lims-stm/chambers-shell-master-home-page'])
  }
  onStabilityProtocolRecord() {
    this.router.navigate(['./rqplabui/lims-stm/stability-prot-rec-home-page'])
  }
  onStabilityProtocolSchedule() {
    this.router.navigate(['./rqplabui/lims-stm/stability-prot-sche-home-page'])
  }
  onStabilityProtocolScheduleRecord() {
    this.router.navigate(['./rqplabui/lims-stm/stability-prot-sche-rec-home-page'])
  }
  
=======
  onWsperamentersMasterMaster() {
    this.router.navigate(['./rqplabui/lims-stm/ws-peramenters-home-page'])
  }
    onWsTemplateindex() {
    this.router.navigate(['./rqplabui/lims-stm/ws-template-index-home-page'])
  }
    onWsperamentersRecord() {
    this.router.navigate(['./rqplabui/lims-stm/ws-peraamenters-record-home-page'])
  }
    onStudyType() {
    this.router.navigate(['./rqplabui/lims-stm/ws-study-type-home-page'])
  }


>>>>>>> ba4e149242966e05cb8433efed5511b99a615203

}
