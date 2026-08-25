import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aqm-module-admin',
  standalone: false,
  templateUrl: './aqm-module-admin.component.html',
  styleUrl: './aqm-module-admin.component.scss'
})
export class AqmModuleAdminComponent {
  constructor(private router: Router) { }
 onAqNomination() {
    this.router.navigate(['./rqplabui/lims-aq/aq-nomination-home-page']);
  }

}
