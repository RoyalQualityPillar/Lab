import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spm-module-admin',
  standalone: false,
  templateUrl: './spm-module-admin.component.html',
  styleUrl: './spm-module-admin.component.scss'
})
export class SpmModuleAdminComponent {
constructor(private router: Router) { }
  spmCompletedRecords(): void {
    this.router.navigate(['./rqplabui/lims/spm-completed']);
  }
}
