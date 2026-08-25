import { Component } from '@angular/core';

@Component({
  selector: 'app-ipm-reviewer',
  standalone: false,
  templateUrl: './ipm-reviewer.component.html',
  styleUrl: './ipm-reviewer.component.scss'
})
export class IpmReviewerComponent {
public reviewerUrl: string = './rqplabui/lims/ipm-reviewer-save';

}
