import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { StdService } from '../../std.service';
import { NotificationService } from 'src/app/common/notification.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';

@Component({
  selector: 'app-show-issuance-container-list',
  standalone: false,
  templateUrl: './show-issuance-container-list.component.html',
  styleUrl: './show-issuance-container-list.component.scss'
})
export class ShowIssuanceContainerListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public ContainerIssuanceForm: FormGroup;
  public ContainerIssuanceData: any;
  public materialValue: any;
  public selectedDialogData: any;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private remoteLoader: RemoteComponentLoaderService,
    public dialog: MatDialog,
    private stdService: StdService,
    public dialogRef: MatDialogRef<ShowIssuanceContainerListComponent>,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data,
    private apiService: ApiService,

  ) {
    this.ContainerIssuanceForm = fb.group({
      nareWeight: [''],
      grossWeight: [''],
      netWeight: [''],
      arNo: ['']
    });
  }

  ngOnInit(): void {
    this.materialValue = this.data.tableData;

  }
  async onSubmitConfirmation() {
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );
    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.Submit();
        }
      }
    });
  }
  Submit() {
    const materialweights = this.ContainerIssuanceForm.value;
    let Uc0001 = this.materialValue.uc0001;
    let ff0016 = materialweights.nareWeight;
    let ff0017 = materialweights.grossWeight;
    let ff0018 = materialweights.netWeight;
    let arno = materialweights.arNo;
    let params = { Uc0001, ff0016, ff0017, ff0018, arno }
    this.apiService
      .sendRequest(
        apiEndPoints.conjumptionContainersList,
        'POST',
        params,
      ).subscribe((data: any) => {
        if (data.errorInfo != null) {
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
