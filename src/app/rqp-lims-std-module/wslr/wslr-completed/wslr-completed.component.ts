import { Component } from '@angular/core';

@Component({
  selector: 'app-wslr-completed',
  standalone: false,
  templateUrl: './wslr-completed.component.html',
  styleUrl: './wslr-completed.component.scss'
})
export class WslrCompletedComponent {
public reviewerUrl: string = './rqplabui/lims-std/wslr-completed-save';
  public isCompleted: string = 'completed';
}
