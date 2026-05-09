import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chm-module-admin',
  standalone: false,
  templateUrl: './chm-module-admin.component.html',
  styleUrl: './chm-module-admin.component.scss'
})
export class ChmModuleAdminComponent {
     constructor(private router: Router) { }

  onChemicalMasterRegistration() {
    this.router.navigate(['./rqplabui/lims-chm/cmr-home-page'])
  }

  onCHMLotRegistration() {
    this.router.navigate(['./rqplabui/lims-chm/clr-home-page'])
  }

    onCHMLotUsage() {
    this.router.navigate(['./rqplabui/lims-chm/clu-home-page'])
  }

      onTestSolutionMaster() {
    this.router.navigate(['./rqplabui/lims-chm/tsm-home-page'])
  }

  onTestSolutionPreparationInputChemicalMaster() {
    this.router.navigate(['./rqplabui/lims-chm/tspicm-home-page'])
  }

   onTestSolutionRecord() {
   this.router.navigate(['./rqplabui/lims-chm/test-Solution-Home-Page'])
  }



}
