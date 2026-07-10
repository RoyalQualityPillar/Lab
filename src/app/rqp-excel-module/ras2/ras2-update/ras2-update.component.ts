import { Component } from '@angular/core';

@Component({
    selector: 'app-ras2-update',
    templateUrl: './ras2-update.component.html',
    styleUrls: ['./ras2-update.component.scss'],
    standalone: false
})
export class Ras2UpdateComponent {

  public url: string = '/rqpqualityui/excel/rasi-update-save';
}
