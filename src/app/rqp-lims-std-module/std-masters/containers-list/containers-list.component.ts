import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Subject, takeUntil, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-containers-list',
  standalone: false,
  templateUrl: './containers-list.component.html',
  styleUrl: './containers-list.component.scss'
})
export class ContainersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public containersListData: any;
  public dataSource: any;
  public isLoading = false;
  public destroy$ = new Subject<void>();
  displayedColumns = [
    'ff0001',
    'ff0002',
    'ff0003',
    'ff0004',
    'ff0005',
    'ff0006',
    'ff0007',
    'ff0008',
    'ff0009',
    'ff0010',
    'ff0011',
    'ff0012',
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private stdService: StdService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private route: Router,

  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.stdService.getContainerList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.containersListData = new MatTableDataSource(this.dataSource);
      this.containersListData.sort = this.sort;
      this.containersListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.containersListData.length == GlobalConstants.size) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }

  public onPaginationCall(): void {
    //todo
  }

  public submit(value: any) {
    let tableData = value;
    let Uc0001 = tableData.uc0001;
    let params = { Uc0001 }
    this.apiService
      .sendRequest(
        apiEndPoints.issuanceContainersList,
        'POST',
        params,
      )
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.notificationService.showSuccess(data.status, () => { });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqplabui/lims-std/std-module-admin');
            });
        }
      });
    // const dialogRef = this.dialog.open(WslotConsumptionComponent, {
    //   minWidth: '80%',
    //   data: { tableData: tableData, pageTitle: 'Document Type Master' },
    // });
  }

}


