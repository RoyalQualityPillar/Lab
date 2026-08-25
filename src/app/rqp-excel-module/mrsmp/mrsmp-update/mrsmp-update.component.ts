import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsmp-update',
    templateUrl: './mrsmp-update.component.html',
    styleUrls: ['./mrsmp-update.component.scss'],
    standalone: false
})
export class MrsmpUpdateComponent {
  public url: string = '/rqpquailtyui/excel/rasi-update-save';
}
