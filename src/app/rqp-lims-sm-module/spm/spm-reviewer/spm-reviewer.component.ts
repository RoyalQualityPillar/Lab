import { Component } from '@angular/core';

@Component({
  selector: 'app-spm-reviewer',
  standalone: false,
  templateUrl: './spm-reviewer.component.html',
  styleUrl: './spm-reviewer.component.scss'
})
export class SpmReviewerComponent {
public reviewerUrl: string = './rqplabui/lims/spm-reviewer-save';
}
