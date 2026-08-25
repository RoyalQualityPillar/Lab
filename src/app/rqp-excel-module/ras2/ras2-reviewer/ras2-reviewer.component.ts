import { Component } from '@angular/core';

@Component({
    selector: 'app-ras2-reviewer',
    templateUrl: './ras2-reviewer.component.html',
    styleUrls: ['./ras2-reviewer.component.scss'],
    standalone: false
})
export class Ras2ReviewerComponent {
  public reviewerUrl: string = '/rqpqualityui/excel/rasi-reviewer-save';
}


