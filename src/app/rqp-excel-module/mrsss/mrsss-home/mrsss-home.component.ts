import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mrsss-home',
    templateUrl: './mrsss-home.component.html',
    styleUrls: ['./mrsss-home.component.scss'],
    standalone: false
})
export class MrsssHomeComponent {
  constructor(private router: Router,private cookieService:CookieService) {}
  public LwAssignmentDashBord() {
    this.router.navigate(['./excel/excel-lw-dash-board']);
  }
  public allPurchasesOrder() {
    this.router.navigate(['./rqpquailtyui/excel/excel-completed']);
  }
  public completedRecords() {
    this.router.navigate(['./rqpquailtyui/mm/dq-completed-records-dashboard']);
  }
 

}
