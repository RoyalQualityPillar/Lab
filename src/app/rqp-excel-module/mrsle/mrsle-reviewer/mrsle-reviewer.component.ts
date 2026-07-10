import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsle-reviewer',
    templateUrl: './mrsle-reviewer.component.html',
    styleUrls: ['./mrsle-reviewer.component.scss'],
    standalone: false
})
export class MrsleReviewerComponent {
  public reviewerUrl: string = '/rqpqualityui/excel/mrsle-reviewer-save';
}
