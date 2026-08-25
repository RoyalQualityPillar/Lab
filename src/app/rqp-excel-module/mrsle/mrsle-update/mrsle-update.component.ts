import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsle-update',
    templateUrl: './mrsle-update.component.html',
    styleUrls: ['./mrsle-update.component.scss'],
    standalone: false
})
export class MrsleUpdateComponent {
  public reviewerUrl: string = '/rqpqualityui/excel/mrsle-update-save';
}
