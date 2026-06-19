import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-wslot-consumption',
  standalone: false,
  templateUrl: './wslot-consumption.component.html',
  styleUrl: './wslot-consumption.component.scss'
})
export class WslotConsumptionComponent implements OnInit {
  public grams: string;
  public armNo: number;
  public isLoading = false;
  public consumptionValue: any;

  constructor(
    private stdService: StdService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<WslotConsumptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.consumptionValue = this.data;
  }

  onSubmit() {
    const wsLotValue = this.consumptionValue.tableData;
    this.stdService.saveWSConsumptionList(wsLotValue.wlcr_ff0001, this.grams, this.armNo).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.isLoading = false;
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: data.errorInfo.message,
            heading: 'Error Information',
          },
        });
      } else {
        this.isLoading = false;
        this.notificationService.showSuccess(data.status, () => {
        });
        this.dialogRef.close();
      }
    });
  }
}
