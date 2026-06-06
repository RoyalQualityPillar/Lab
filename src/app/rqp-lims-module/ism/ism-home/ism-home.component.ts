import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ism-home',
  standalone: false,
  templateUrl: './ism-home.component.html',
  styleUrl: './ism-home.component.scss'
})
export class IsmHomeComponent {
   constructor(private router: Router) {}
  onAllPaAssignmentDashBord() {
    console.log('paaa');
    this.router.navigate(['./rqpquailtyui/qms/cc-pa-dash-bord']);
  }
  allCompletedRecords() {
    this.router.navigate(['./rqpquailtyui/qms/cc-completed']);
  }

}
