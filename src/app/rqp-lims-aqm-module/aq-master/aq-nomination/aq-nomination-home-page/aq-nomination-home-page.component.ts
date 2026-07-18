import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-constants';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { AqNominationService } from '../aq-nomination.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/service/api.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { AqNominationCreateUpdateComponent } from '../aq-nomination-create-update/aq-nomination-create-update.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
import { AddNewRecordComponent } from 'src/app/rqp-lims-sm-module/spm-masters/add-new-record/add-new-record.component';
import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';

@Component({
  selector: 'app-aq-nomination-home-page',
  standalone: false,
  templateUrl: './aq-nomination-home-page.component.html',
  styleUrl: './aq-nomination-home-page.component.scss'
})
export class AqNominationHomePageComponent    implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  isLoading = false;
  filterObject: any;
  activeUserFilterObject: any;
  tableData: MatTableDataSource<any>;
  size: any;
  dataSource: any;
  pageIndex: any;
  tableDataLoaded = false;
  currentApiResLength: any;
  allRoleDataLength: any;
  copiedData: any;
  selectedTab = 0;
  filterFieldError = false;
  filterValueError = false;
  activeUsertableData: MatTableDataSource<any>;
  isFilterExpanded = false;
  allAqnominationTabledataurl: any;
  activeAqnominationTabledataurl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    public dialog: MatDialog,
    private apiService: ApiService,
    public AqNominationService: AqNominationService
  ) {}

  ngOnInit(): void {
    this.allAqnominationTabledataurl = apiEndPoints.allAqnominationTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.AqnominationUserProfileFilterData;
    this.activeAqnominationTabledataurl = apiEndPoints.activeAqnominationTabledata;
    this.params = { pageIndex, size, unitCode };
  }

  ngAfterViewInit() {}

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {}
  activeUserSelectedRowData: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(AqNominationCreateUpdateComponent, {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Registration' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  selectedRow: any;
  setSelectedID(row: any) {
    this.selectedRow = row;
  }
  selectedAllRow: any;
  setSelectedAllID(row: any) {
    this.selectedAllRow = row;
  }
  onActiveSelectRow() {
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(AqNominationCreateUpdateComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
  onActiveSelectAuditTrailRow() {
    let tableData = [
      { labelName: 'Version', value: this.selectedRow.version },
      {
        labelName: 'Status',
        value: this.onChangeStatus(this.selectedRow.status),
      },
      { labelName: 'AQ Nomination Code', value: this.selectedRow.uc0001 },
      { labelName: 'Unit Code', value: this.selectedRow.ff0001 },
      { labelName: 'Empolyee Id', value: this.selectedRow.ff0002 },
      { labelName: 'Empolyee Name', value: this.selectedRow.ff0003 },
      { labelName: 'Test Code', value: this.selectedRow.ff0004 },
      { labelName: 'Total Experience ', value: this.selectedRow.ff0005 },
      { labelName: 'Past Experience ', value: this.selectedRow.ff0006 },
      { labelName: 'Createdon', value: this.selectedRow.createdon },
      { labelName: 'Createdby', value: this.selectedRow.createdby },
      { labelName: 'Comments', value: this.selectedRow.comments },
    ];
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(CommonActiveAuditTrailComponent, {
        minWidth: '80%',
        data: { tableData: tableData, pageTitle: 'Aq Nomination' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  UC0001: any;
  UC0002: any;
  onSearchAllAuditTrail() {
    this.selectedAllRow = this.selectedRow;
    if (this.selectedAllRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      let UC0001 = this.selectedAllRow.uc0001;
      const params = { UC0001 };
      this.apiService
        .sendRequest(apiEndPoints.AqnominationAllAuditTrail, 'GET', params)
        .subscribe((data: any) => {
          let newFormatData = this.structureResponse(data.data);
          this.isLoading = false;
        });
    }
  }
  onBmrNumberSystemUpdate(){
    const dialogRef = this.dialog.open(AddNewRecordComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    //  this.selectedAllRow = this.selectedRow;
    //   if (this.selectedRow.length == 0) {
    //   this.dialog.open(MessageDialogComponent, {
    //     data: {
    //       message: 'Please select any row',
    //       heading: 'Error Information',
    //     },
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(AddNewRecordComponent, {
    //     minWidth: '80%',
    //     data: { tableData: this.selectedRow, type: 'Modification' },
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {});
    // }
  }
  formatedData: any;
  structureResponse(apiResponse: any) {
    const rows = apiResponse.map((item) => {
      return {
        fields: [
          { labelName: 'Version', value: item.version },
          {
            labelName: 'Status',
            value: this.onChangeStatus(item.status),
          },
          { labelName: 'AQ Nomination Code', value: this.selectedRow.uc0001 },
      { labelName: 'Unit Code', value: this.selectedRow.ff0001 },
      { labelName: 'Empolyee Id', value: this.selectedRow.ff0002 },
      { labelName: 'Empolyee Name', value: this.selectedRow.ff0003 },
      { labelName: 'Test Code', value: this.selectedRow.ff0004 },
      { labelName: 'Total Experience ', value: this.selectedRow.ff0005 },
      { labelName: 'Past Experience ', value: this.selectedRow.ff0006 },
          { labelName: 'Createdon', value: item.createdon },
          { labelName: 'Createdby', value: item.createdby },
          { labelName: 'Comments', value: item.comments },
        ],
      };
    });
    const dialogRef = this.dialog.open(CommonAllAuditTrailComponent, {
      minWidth: '80%',
      data: { tableData: rows, pageTitle: 'Aq Nomination' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'AQ Nomination Code',
    ff0001: 'Unit Code',    
    ff0002: 'Empolyee Id',
    ff0003: 'Empolyee Name',
    ff0004: 'Test Code',
    ff0005: 'Total Experience ',
    ff0006: 'Past Experience ',
    status: 'Status',
    version: 'Version',
    createdon: 'Createdon',
    createdby: 'Createdby',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Business Unit Type';
  allButtonConfig = [
    { label: ' Audit Trail', action: 'Audit_Trail', color: 'primary' },
    // { label: 'Save', action: 'save', color: 'accent' }
    // Add more button configurations as needed
  ];

  activeButtonConfig = [
    { label: ' Audit Trail', action: 'Audit_Trail', color: 'primary' },
    { label: 'Update', action: 'Update', color: 'accent' },
        { label: 'Number System Update', action: 'Number_System_Update', color: 'accent' },
  ];
  // selectedRow:any;
  handleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    switch (action) {
      case 'Audit_Trail':
        this.onSearchAllAuditTrail();
        break;
      
    }
  }
  activeHandleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    switch (action) {
      case 'Audit_Trail':
        this.onActiveSelectAuditTrailRow();
        break;
      case 'Update':
        this.onActiveSelectRow();
        break;
        case 'Number_System_Update':
        this.onBmrNumberSystemUpdate();
        break;
    }
  }

  handleSubmit(row: any) {
    console.log('submitBtn');
  }
}
 {

}
