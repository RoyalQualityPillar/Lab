import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wslr-module-admin',
  standalone: false,
  templateUrl: './wslr-module-admin.component.html',
  styleUrl: './wslr-module-admin.component.scss'
})
export class WslrModuleAdminComponent {
constructor(private router: Router) { }
  WSLRCompletedRecordslist(): void {
    this.router.navigate(['./rqplabui/lims-std/wslr-completed']);
  }
}
