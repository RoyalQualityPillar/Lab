import { Component } from '@angular/core';

@Component({
  selector: 'app-ism-reviewer-home-page',
  standalone: false,
  templateUrl: './ism-reviewer-home-page.component.html',
  styleUrl: './ism-reviewer-home-page.component.scss'
})
export class IsmReviewerHomePageComponent {
  public reviewerUrl: string = './rqplabui/lims/ipm-reviewer-save';


}
