import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsfd-reviewer',
    templateUrl: './mrsfd-reviewer.component.html',
    styleUrls: ['./mrsfd-reviewer.component.scss'],
    standalone: false
})
export class MrsfdReviewerComponent {
  public reviewerUrl: string = '/excel/rasi-reviewer-save';

}
