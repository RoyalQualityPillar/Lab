import { Component } from '@angular/core';

@Component({
  selector: 'app-cm-completed',
  standalone: false,
  templateUrl: './cm-completed.component.html',
  styleUrl: './cm-completed.component.scss'
})
export class CmCompletedComponent {
  public reviewerUrl: string = '/cm/cm-completed-save';
  public isCompleted: string = 'completed';

}
