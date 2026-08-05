import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { WslotConsumptionComponent } from '../wslot-consumption/wslot-consumption.component';

@Component({
  selector: 'app-wslot-containers-list',
  standalone: false,
  templateUrl: './wslot-containers-list.component.html',
  styleUrl: './wslot-containers-list.component.scss'
})
export class WslotContainersListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public sfgUnderTestListData: any;
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
    'createdon',
    'createdby',
    'action',
  ];
  constructor(
    private stdService: StdService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.stdService.getWSPackList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.sfgUnderTestListData = new MatTableDataSource(this.dataSource);
      this.sfgUnderTestListData.sort = this.sort;
      this.sfgUnderTestListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.sfgUnderTestListData.length == GlobalConstants.size) {
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
    console.log(tableData);
    const dialogRef = this.dialog.open(WslotConsumptionComponent, {
      minWidth: '80%',
      data: { tableData: tableData, pageTitle: 'Document Type Master' },
    });
  }

}

