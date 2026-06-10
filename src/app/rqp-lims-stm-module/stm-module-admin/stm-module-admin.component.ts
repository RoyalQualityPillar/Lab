import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stm-module-admin',
  standalone: false,
  templateUrl: './stm-module-admin.component.html',
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


}
