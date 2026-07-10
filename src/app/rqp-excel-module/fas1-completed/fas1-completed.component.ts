import { Component } from '@angular/core';

@Component({
    selector: 'app-fas1-completed',
    templateUrl: './fas1-completed.component.html',
    styleUrls: ['./fas1-completed.component.scss'],
    standalone: false
})
export class Fas1CompletedComponent {
  public reviewerUrl: string = '/rqpquailtyui/excel/fas1-completed-save';
  public isCompleted: string = 'completed';
}
