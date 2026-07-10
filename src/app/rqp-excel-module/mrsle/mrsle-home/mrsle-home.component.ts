import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mrsle-home',
    templateUrl: './mrsle-home.component.html',
    styleUrls: ['./mrsle-home.component.scss'],
    standalone: false
})
export class MrsleHomeComponent {
  constructor(private router: Router,private cookieService:CookieService) {}
  public LwAssignmentDashBord() {
    this.router.navigate(['./excel/excel-lw-dash-board']);
  }
  public allPurchasesOrder() {
    this.router.navigate(['./rqpqualityui/excel/mrsle-completed']);
  }
  public completedRecords() {
    this.router.navigate(['./rqpqualityui/mm/dq-completed-records-dashboard']);
  }
 
}



