import { Component } from '@angular/core';

@Component({
  selector: 'app-ism-completed',
  standalone: false,
  templateUrl: './ism-completed.component.html',
  styleUrl: './ism-completed.component.scss'
})
export class IsmCompletedComponent  {
  public reviewerUrl: string = './rqplabui/ism/ism-completed-save';
  public isCompleted: string = 'completed';
}
