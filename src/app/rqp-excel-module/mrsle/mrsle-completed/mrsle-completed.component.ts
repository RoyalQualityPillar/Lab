import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsle-completed',
    templateUrl: './mrsle-completed.component.html',
    styleUrls: ['./mrsle-completed.component.scss'],
    standalone: false
})
export class MrsleCompletedComponent {
  public reviewerUrl: string = '/rqpqualityui/excel/mrsle-completed-save';
  public isCompleted: string = 'completed';
}
