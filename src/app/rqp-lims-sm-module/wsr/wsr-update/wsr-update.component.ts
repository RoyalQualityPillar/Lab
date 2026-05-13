import { Component } from '@angular/core';

@Component({
    selector: 'app-wsr-update',
    templateUrl: './wsr-update.component.html',
    styleUrls: ['./wsr-update.component.scss'],
    standalone: false
})
export class WsrUpdateComponent {
  public updateSaveUrl = '/lims/wsr-update-save';
}
