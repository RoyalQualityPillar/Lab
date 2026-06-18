import { Component } from '@angular/core';

@Component({
  selector: 'app-wslr-reviewer',
  standalone: false,
  templateUrl: './wslr-reviewer.component.html',
  styleUrl: './wslr-reviewer.component.scss'
})
export class WslrReviewerComponent {
  public reviewerUrl: string = './rqplabui/lims-std/wslr-reviewer-save';

}
