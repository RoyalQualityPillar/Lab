import { Component } from '@angular/core';

@Component({
    selector: 'app-excel-completed',
    templateUrl: './excel-completed.component.html',
    styleUrls: ['./excel-completed.component.scss'],
    standalone: false
})
export class ExcelCompletedComponent {
  public reviewerUrl: string = './rqpquailtyui/excel/excel-completed-save';
  public isCompleted: string = 'completed';
}
