import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api-service/api.service';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ShowIssuanceContainerListComponent } from '../show-issuance-container-list/show-issuance-container-list.component';

@Component({
  selector: 'app-issuance-container-list',
  standalone: false,
  templateUrl: './issuance-container-list.component.html',
  styleUrl: './issuance-container-list.component.scss'
})
export class IssuanceContainerListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public issuanceContainersListData: any;
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
    'action',
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
    this.stdService.getIssuanceContainerList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.issuanceContainersListData = new MatTableDataSource(this.dataSource);
      this.issuanceContainersListData.sort = this.sort;
      this.issuanceContainersListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.issuanceContainersListData.length == GlobalConstants.size) {
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
    const dialogRef = this.dialog.open(ShowIssuanceContainerListComponent, {
      minWidth: '80%',
      data: { tableData: tableData, pageTitle: 'Document Type Master' },
    });
  }

}



