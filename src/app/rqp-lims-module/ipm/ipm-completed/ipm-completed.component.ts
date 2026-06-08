import { Component } from '@angular/core';

@Component({
  selector: 'app-ipm-completed',
  standalone: false,
  templateUrl: './ipm-completed.component.html',
  styleUrl: './ipm-completed.component.scss'
})
export class IpmCompletedComponent {
 public reviewerUrl: string = './rqplabui/lims/ipm-completed-save';
  public isCompleted: string = 'completed';
}
