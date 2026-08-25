import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-action-attachments-list',
  standalone: false,
  templateUrl: './action-attachments-list.component.html',
  styleUrl: './action-attachments-list.component.scss'
})
export class ActionAttachmentsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public tableData: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  public actionList: any;
  private dataSource: any;
  public isLoading = false;
  public actionListValue: any;
  private pageIndex = 0;
  private newList: any;
  private size: any;
  private copiedData: any;
  public tableDataLoaded = false;
  private lifeCycleInfoDataLength: any;
  public addedActiondisplayedColumns: string[] = [
    'action',
    'requestNo',
    'lifeCycleNo',
    'department',
    'moduleCode',
    'createdby',
    'status',
    'createdon',
    'actionDescription'
  ];
  constructor(
    private apiService: ApiService,
    public lifeCycleDataService: LifeCycleDataService,
    private toolbarService: ToolbarService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }
  ngOnInit(): void {
    this.actionListValue = this.data;
    this.getActions(this.data);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const nomRows = this.tableData.data.length;
    return numSelected === nomRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.tableData.data.forEach((row) => this.selection.select(row));
  }
  getActions(action: any) {
    const lc0004 = action.lc0004;
    const lc0005 = action.lc0002;
    const lc0003 = action.lc0003;
    const ff0001 = action.ff0001;
    const params = { lc0003, ff0001, lc0004, lc0005 };
    this.apiService
      .sendRequest(apiEndPoints.actionUpdateReviewList, 'GET', params)
      .subscribe((data: any) => {
        this.actionList = data.data.actionDtoList;
        this.tableData = new MatTableDataSource(this.actionList);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      });
  }
  public pageChanged(event): void {
    if (this.dataSource?.length == GlobalConstants.size && Array.isArray(this.dataSource)) {
      if (
        event.length - (event.pageIndex + 1) * event.pageSize == 0 ||
        event.length < event.pageSize
      ) {
        this.onPaginationCall();
      }
    }
  }
  private onPaginationCall(): void {
    this.pageIndex = this.pageIndex + 1;
    this.size = GlobalConstants.size;
    this.isLoading = true;
    this.lifeCycleDataService
      .getLifeCycleInfo(this.pageIndex, this.size)
      .subscribe((data: any) => {
        this.newList = data.data.content;
        this.dataSource.push(...this.newList);
        this.lifeCycleInfoDataLength = this.dataSource.length;
        this.copiedData = JSON.stringify(this.dataSource);
        this.tableData = new MatTableDataSource(this.dataSource);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
        this.tableDataLoaded = true;
        this.toolbarService.setTableData(this.dataSource);
        this.isLoading = false;
      });
    this.isLoading = false;
  }

}
