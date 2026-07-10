import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-fas1-home',
    templateUrl: './fas1-home.component.html',
    styleUrls: ['./fas1-home.component.scss'],
    standalone: false
})
export class Fas1HomeComponent {
  constructor(private router: Router,private cookieService:CookieService) {}
  public LwAssignmentDashBord() {
    this.router.navigate(['./excel/excel-lw-dash-board']);
  }
  public allPurchasesOrder() {
    this.router.navigate(['./rqpquailtyui/excel/fas1-completed']);
  }
  public completedRecords() {
    this.router.navigate(['./rqpquailtyui/mm/dq-completed-records-dashboard']);
  }
}
