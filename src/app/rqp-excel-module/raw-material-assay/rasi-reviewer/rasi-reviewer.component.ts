import { Component } from '@angular/core';

@Component({
    selector: 'app-rasi-reviewer',
    templateUrl: './rasi-reviewer.component.html',
    styleUrls: ['./rasi-reviewer.component.scss'],
    standalone: false
})
export class RasiReviewerComponent {
  public reviewerUrl: string = 'rqpquailtyui/excel/rasi-reviewer-save';
}
