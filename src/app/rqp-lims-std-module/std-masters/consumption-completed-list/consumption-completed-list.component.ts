import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-consumption-completed-list',
  standalone: false,
  templateUrl: './consumption-completed-list.component.html',
  styleUrl: './consumption-completed-list.component.scss'
})
export class ConsumptionCompletedListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public consumptionCompletedListData: any;
  public dataSource: any;
  public isLoading = false;
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
    // 'action',
  ];
  constructor(
    private stdService: StdService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private apiService: ApiService,
    private notificationService: NotificationService,

  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.stdService.getConsumptionCompletedList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.consumptionCompletedListData = new MatTableDataSource(this.dataSource);
      this.consumptionCompletedListData.sort = this.sort;
      this.consumptionCompletedListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.consumptionCompletedListData.length == GlobalConstants.size) {
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
    // let tableData = value;
    // let Uc0001 = tableData.uc0001;
    // let params = { Uc0001 }
    // this.apiService
    //   .sendRequest(
    //     apiEndPoints.issuanceContainersList,
    //     'POST',
    //     params,
    //   )
    //   .subscribe((data: any) => {
    //     if (data.errorInfo != null) {
    //       this.dialog.open(MessageDialogComponent, {
    //         data: {
    //           message: data.errorInfo.message,
    //           heading: 'Error Information',
    //         },
    //       });
    //     } else {
    //       this.notificationService.showSuccess(data.status, () => { });
    //     }
    //   });
    // const dialogRef = this.dialog.open(WslotConsumptionComponent, {
    //   minWidth: '80%',
    //   data: { tableData: tableData, pageTitle: 'Document Type Master' },
    // });
  }

}


