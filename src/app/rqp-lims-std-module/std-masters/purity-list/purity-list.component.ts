import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StdService } from '../../std.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/common/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-purity-list',
  standalone: false,
  templateUrl: './purity-list.component.html',
  styleUrl: './purity-list.component.scss'
})
export class PurityListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public purityListData: any;
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
    'createdon',
    'createdby',
    // 'action',
  ];
  constructor(
    private stdService: StdService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }
  ngOnInit(): void {
    let unitCode = this.cookieService.get('buCode');
    this.stdService.getPurityList(unitCode).subscribe((data: any) => {
      this.dataSource = data.data;
      this.purityListData = new MatTableDataSource(this.dataSource);
      this.purityListData.sort = this.sort;
      this.purityListData.paginator = this.paginator;
    });
  }
  public pageChanged(event): void {
    if (this.purityListData.length == GlobalConstants.size) {
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
    // console.log(tableData);
    // const dialogRef = this.dialog.open(WslotConsumptionComponent, {
    //   minWidth: '80%',
    //   data: { tableData: tableData, pageTitle: 'Document Type Master' },
    // });
  }

}


