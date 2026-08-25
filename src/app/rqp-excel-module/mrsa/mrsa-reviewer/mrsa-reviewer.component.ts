import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsa-reviewer',
    templateUrl: './mrsa-reviewer.component.html',
    styleUrls: ['./mrsa-reviewer.component.scss'],
    standalone: false
})
export class MrsaReviewerComponent {
  public reviewerUrl: string = '/rqpquailtyui//excel/rasi-reviewer-save';
}
