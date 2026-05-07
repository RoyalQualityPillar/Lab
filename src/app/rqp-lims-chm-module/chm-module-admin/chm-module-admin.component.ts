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

}
