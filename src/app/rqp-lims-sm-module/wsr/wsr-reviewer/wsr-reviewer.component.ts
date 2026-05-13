import { Component } from '@angular/core';

@Component({
    selector: 'app-wsr-reviewer',
    templateUrl: './wsr-reviewer.component.html',
    styleUrls: ['./wsr-reviewer.component.scss'],
    standalone: false
})
export class WsrReviewerComponent {
  public updateSaveUrl = '/rqpquailtyui/lims/wsr-reviewer-save';
}
