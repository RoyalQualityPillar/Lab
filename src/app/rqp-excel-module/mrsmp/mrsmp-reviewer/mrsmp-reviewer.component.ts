import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsmp-reviewer',
    templateUrl: './mrsmp-reviewer.component.html',
    styleUrls: ['./mrsmp-reviewer.component.scss'],
    standalone: false
})
export class MrsmpReviewerComponent {
  public reviewerUrl: string = '/rqpquailtyui/excel/rasi-reviewer-save';

}
