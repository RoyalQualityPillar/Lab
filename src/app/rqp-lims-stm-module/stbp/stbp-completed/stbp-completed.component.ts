import { Component } from '@angular/core';

@Component({
  selector: 'app-stbp-completed',
  standalone: false,
  templateUrl: './stbp-completed.component.html',
  styleUrl: './stbp-completed.component.scss'
})
export class StbpCompletedComponent {
public reviewerUrl: string = './rqplabui/lims-stm/stbp-completed-save';
  public isCompleted: string = 'completed';
}
