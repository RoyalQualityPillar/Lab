import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mrsfd-home',
    templateUrl: './mrsfd-home.component.html',
    styleUrls: ['./mrsfd-home.component.scss'],
    standalone: false
})
export class MrsfdHomeComponent {
  constructor(private router: Router,private cookieService:CookieService) {}
  public LwAssignmentDashBord() {
    this.router.navigate(['./excel/excel-lw-dash-board']);
  }
  public allPurchasesOrder() {
    this.router.navigate(['./excel/excel-completed']);
  }
  public completedRecords() {
    this.router.navigate(['./mm/dq-completed-records-dashboard']);
  }
 

}
