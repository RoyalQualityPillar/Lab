import { Component } from '@angular/core';

@Component({
  selector: 'app-stbp-reviewer',
  standalone: false,
  templateUrl: './stbp-reviewer.component.html',
  styleUrl: './stbp-reviewer.component.scss'
})
export class StbpReviewerComponent {
public reviewerUrl: string = './rqplabui/lims-stm/stbp-reviewer-save';

}
