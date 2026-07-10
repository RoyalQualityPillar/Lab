import { Component } from '@angular/core';
import { UPDATE_URL } from '../../constants/excel.constants';

@Component({
    selector: 'app-es-update',
    templateUrl: './es-update.component.html',
    styleUrls: ['./es-update.component.scss'],
    standalone: false
})
export class EsUpdateComponent {
  public updateSaveUrl = UPDATE_URL;
}
