import { Component } from '@angular/core';
import { REVIEW_URL } from '../../constants/excel.constants';

@Component({
    selector: 'app-es-reviewer',
    templateUrl: './es-reviewer.component.html',
    styleUrls: ['./es-reviewer.component.scss'],
    standalone: false
})
export class EsReviewerComponent {
  public reviewerUrl: string = REVIEW_URL;
}
