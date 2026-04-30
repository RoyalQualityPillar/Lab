import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lims-cm-master-home-page',
    templateUrl: './lims-cm-master-home-page.component.html',
    styleUrls: ['./lims-cm-master-home-page.component.scss'],
    standalone: false
})
export class LimsCmMasterHomePageComponent {
  constructor(private router: Router) {}
  onCciMaster() {
    this.router.navigate([
      './rqplabui/lims-cm/lims-cm-master-home-page/lims-cm-cci-home-page',
    ]);
  }
  onClMaster() {
    this.router.navigate([
      './rqplabui/lims-cm/lims-cm-master-home-page/lims-cm-cl-home-page',
    ]);
  }
  onColumnMaster() {
    this.router.navigate([
      './rqplabui/lims-cm/lims-cm-master-home-page/lims-cm-column-home-page',
    ]);
  }
  public onCompletedDashboard(): void {
    this.router.navigate(['./rqplabui/qms/cc-completed-dashboard']);
  }

  public onPendingDashboard(): void {
    this.router.navigate(['./rqplabui/qms/cc-pending-dashboard']);
  }
}
