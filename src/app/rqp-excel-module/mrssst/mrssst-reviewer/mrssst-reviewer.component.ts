import { Component } from '@angular/core';

@Component({
    selector: 'app-mrssst-reviewer',
    templateUrl: './mrssst-reviewer.component.html',
    styleUrls: ['./mrssst-reviewer.component.scss'],
    standalone: false
})
export class MrssstReviewerComponent {
  public reviewerUrl: string = '/rqpquailtyui/excel/rasi-reviewer-save';

}
