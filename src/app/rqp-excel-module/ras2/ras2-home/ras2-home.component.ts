import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-ras2-home',
    templateUrl: './ras2-home.component.html',
    styleUrls: ['./ras2-home.component.scss'],
    standalone: false
})
export class Ras2HomeComponent {
  constructor(private router: Router,private cookieService:CookieService) {}
  public LwAssignmentDashBord() {
    this.router.navigate(['./excel/excel-lw-dash-board']);
  }
  public allPurchasesOrder() {
    this.router.navigate(['./rqpqualityui/excel/excel-completed']);
  }
  public completedRecords() {
    this.router.navigate(['./rqpqualityui/mm/dq-completed-records-dashboard']);
  }
 

}
