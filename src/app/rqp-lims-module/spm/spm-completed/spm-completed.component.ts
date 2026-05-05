import { Component } from '@angular/core';

@Component({
  selector: 'app-spm-completed',
  standalone: false,
  templateUrl: './spm-completed.component.html',
  styleUrl: './spm-completed.component.scss'
})
export class SpmCompletedComponent {
  public reviewerUrl: string = './rqplabui/lims/spm-completed-save';
  public isCompleted: string = 'completed';
}
