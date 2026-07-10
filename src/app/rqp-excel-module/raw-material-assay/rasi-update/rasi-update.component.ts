import { Component } from '@angular/core';

@Component({
    selector: 'app-rasi-update',
    templateUrl: './rasi-update.component.html',
    styleUrls: ['./rasi-update.component.scss'],
    standalone: false
})
export class RasiUpdateComponent {
  public url: string = '/rqpquailtyui/excel/rasi-update-save';
}
