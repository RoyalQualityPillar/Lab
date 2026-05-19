import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vsm-module-admin',
  standalone: false,
  templateUrl: './vsm-module-admin.component.html',
  styleUrl: './vsm-module-admin.component.scss'
})
export class VsmModuleAdminComponent {
constructor(private router: Router) { }

  onVolumetricSolutionUsage() {
    this.router.navigate(['./rqplabui/lims-vsm/vsu-home-page'])
  }
   onSolutionNameMaster() {
    this.router.navigate(['./rqplabui/lims-vsm/snm-home-page'])
  }
  onSolutionTempletMaster() {
    this.router.navigate(['./rqplabui/lims-vsm/stm-home-page'])
  }
    onSolutionPreparationMaster() {
    this.router.navigate(['./rqplabui/lims-vsm/spm-home-page'])
  }
   onSampleRegestrationVsMaster() {
    this.router.navigate(['./rqplabui/lims-vsm/sample-regestration-vs-home-page'])
  }
  onSampleTestPlanVsMaster() {
    this.router.navigate(['./rqplabui/lims-vsm/sample-test-plan-vs-home-page'])
  }
  
}
