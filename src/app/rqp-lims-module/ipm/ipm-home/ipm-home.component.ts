import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipm-home',
  standalone: false,
  templateUrl: './ipm-home.component.html',
  styleUrl: './ipm-home.component.scss'
})
export class IpmHomeComponent {
 constructor(private router: Router) {}
  onAllPaAssignmentDashBord() {
    this.router.navigate(['./qms/cc-pa-dash-bord']);
  }
  allCompletedRecords() {
    this.router.navigate(['./rqplabui/lims/ipm-completed']);
  }
}

