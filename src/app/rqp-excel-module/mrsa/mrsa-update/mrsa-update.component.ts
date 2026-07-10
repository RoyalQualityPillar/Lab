import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsa-update',
    templateUrl: './mrsa-update.component.html',
    styleUrls: ['./mrsa-update.component.scss'],
    standalone: false
})
export class MrsaUpdateComponent {
  public url: string = '/rqpquailtyui/excel/rasi-update-save';
}
