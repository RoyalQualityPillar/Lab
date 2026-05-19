import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lims-cm-module-home-page',
    templateUrl: './lims-cm-module-home-page.component.html',
    styleUrls: ['./lims-cm-module-home-page.component.scss'],
    standalone: false
})
export class LimsCmModuleHomePageComponent {
  constructor(private router: Router) {}
}
