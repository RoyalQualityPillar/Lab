import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-mrssst-home',
    templateUrl: './mrssst-home.component.html',
    styleUrls: ['./mrssst-home.component.scss'],
    standalone: false
})
export class MrssstHomeComponent {
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
