import { Component } from '@angular/core';

@Component({
    selector: 'app-mrsfd-update',
    templateUrl: './mrsfd-update.component.html',
    styleUrls: ['./mrsfd-update.component.scss'],
    standalone: false
})
export class MrsfdUpdateComponent {
  public url: string = '/excel/rasi-update-save';

}
