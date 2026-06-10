import { Component } from '@angular/core';

@Component({
  selector: 'app-ism-reviewer',
  standalone: false,
  templateUrl: './ism-reviewer.component.html',
  styleUrl: './ism-reviewer.component.scss'
})
export class IsmReviewerComponent {
public reviewerUrl: string = './rqplabui/lims/ism-reviewer-home-page';

}
