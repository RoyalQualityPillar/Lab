import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsss-reviewer',
    templateUrl: './mrsss-reviewer.component.html',
    styleUrls: ['./mrsss-reviewer.component.scss'],
    standalone: false
})
export class MrsssReviewerComponent {
  public reviewerUrl: string = '/rqpquailtyui/excel/mrsss-reviewer-save';
}
