import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { SelectionModel } from '@angular/cdk/collections';
import { CookieService } from 'ngx-cookie-service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import moment from 'moment';
import { UtMasterService } from '../ut-master.service';
import { UtMasterCreateUpdateComponent } from '../ut-master-create-update/ut-master-create-update.component';
import { exportData } from 'bk-export';

import { GlobalConstants } from 'src/app/common/global-constants';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import {ApiService} from '../../../../../app/service/api-service/api.service'

@Component({
  selector: 'app-ut-master-home-page',
  templateUrl: './ut-master-home-page.component.html',
  styleUrls: ['./ut-master-home-page.component.scss'],
  standalone: false,
})
export class UtMasterHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  allRoleMasterdisplayedColumns: string[] = [
    'action',
    'uc0001',
    'ff0001',
    'ff0002',
    'ff0003',
    'status',
    'version',
    'createdon',
    'createdby',
  ];
  activeRoleMasterdisplayedColumns: string[] = [
    'action',
    'uc0001',
    'ff0001',
    'ff0002',
    'ff0003',
    'status',
    'version',
    'createdon',
    'createdby',
  ];
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
  allutMasterTableDataUrl: any;
  activeutMasterTableDataUrl: any;
  filterApiUrl: any;
  activeFilterApiUrl:any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    private apiService: ApiService,
    public dialog: MatDialog,
    public utMasterService: UtMasterService
  ) {}

  ngOnInit(): void {
    this.allutMasterTableDataUrl = apiEndPoints.allUtMasterTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.utMasterUserProfileFilterData;
   this.activeFilterApiUrl = apiEndPoints.activatedUtSearch;
    this.activeutMasterTableDataUrl = apiEndPoints.activeUtMasterTabledata;
    this.params = { pageIndex, size, unitCode };
    // this.filterObject = {
    //   field: 'SELECT',
    //   value: '',
    //   condition: 'equals',
    //   DateFieldvalue1: '',
    //   DateFieldvalue2: '',
    // };
    // this.activeUserFilterObject = {
    //   field: 'SELECT',
    //   value: '',
    //   condition: 'equals',
    //   DateFieldvalue1: '',
    //   DateFieldvalue2: '',
    // };
  }

  ngAfterViewInit() {
    // this.onLoadAllRoleMaster();
    // this.OnLoadActiveRoleMaster();
  }
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {
    // this.selectedTab = tabChangeEvent.index;
    // if (this.selectedTab == 0) {
    //   this.onLoadAllRoleMaster();
    // } else if (this.selectedTab == 1) {
    //   this.OnLoadActiveRoleMaster();
    // }
  }
  activeUserSelectedRowData: any;
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
          message: 'Please Select Any Row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(UtMasterCreateUpdateComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.getLatestData = true;

      });
      this.getLatestData = false;

    }
  }
  onActiveSelectAuditRow() {
    let tableData = [
      { labelName: 'Version', value: this.selectedRow.version },
      {
        labelName: 'Status',
        value: this.onChangeStatus(this.selectedRow.status),
      },
      { labelName: 'UOM Number', value: this.selectedRow.uc0001 },
      { labelName: 'UOM Name', value: this.selectedRow.ff0001 },
      { labelName: 'Business Unit Code', value: this.selectedRow.ff0002 },
      { labelName: 'UOM Code', value: this.selectedRow.ff0003 },
      { labelName: 'Category', value: this.selectedRow.uc0002 },
      { labelName: 'Createdon', value: this.selectedRow.createdon },
      { labelName: 'Createdby', value: this.selectedRow.createdby },
      { labelName: 'Comments', value: this.selectedRow.comments },
    ];
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please Select Any Row',
          heading: 'Error Information',
        },
      });
    } else {
      const dialogRef = this.dialog.open(CommonActiveAuditTrailComponent, {
        minWidth: '80%',
        data: { tableData: tableData, pageTitle: 'Unit Master' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }

  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(UtMasterCreateUpdateComponent, {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Registration' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLatestData = true;
    });
    this.getLatestData = false;
  }

  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
  onSearchAllAuditTrail() {
    this.selectedAllRow = this.selectedRow;
    console.log(this.selectedAllRow);
    if (this.selectedAllRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please Select Any Row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      // this.utMasterService
      //   .onAllRoleAuditTrail(this.selectedAllRow.uc0001)
      //   .subscribe((data: any) => {
      let UC0001 = this.selectedAllRow.uc0001;
      const params = { UC0001 };
      this.apiService
        .sendRequest(apiEndPoints.utMasterAllAuditTrail, 'GET', params)
        .subscribe((data: any) => {
          let newFormatData = this.structureResponse(data.data);
          this.isLoading = false;
        });
    }
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
          { labelName: 'UOM Number', value: item.uc0001 },
          { labelName: 'UOM Name', value: item.ff0001 },
          { labelName: 'Business Unit Code', value: item.ff0002 },
          { labelName: 'UOM Code', value: item.ff0003 },
          { labelName: 'Category', value: item.uc0002 },
          { labelName: 'Createdon', value: item.createdon },
          { labelName: 'Createdby', value: item.createdby },
          { labelName: 'Comments', value: item.comments },
        ],
      };
    });
    const dialogRef = this.dialog.open(CommonAllAuditTrailComponent, {
      minWidth: '80%',
      data: { tableData: rows, pageTitle: 'Role' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  columnConfig = {
    action: 'Action',
    ff0001: 'UOM Name',
    uc0001: 'UOM Number',
    ff0002: 'Organization Unit Code',
    ff0003: 'UOM Code',
    status: 'Status',
    version: 'Version',
    createdon: 'Created On',
    createdby: 'Created By',
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
    // Add more button configurations as needed
  ];
  // selectedRow:any;
  handleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    console.log(action);
    switch (action) {
      case 'Audit_Trail':
        this.onSearchAllAuditTrail();
        break;
      // case 'save':
      //   this.handleSave(row);
      //   break;
    }
  }
  activeHandleButtonAction(event: { action: string; row: any }) {
    const { action, row } = event;
    this.selectedRow = row; // Set the selected row
    console.log(action);
    switch (action) {
      case 'Audit_Trail':
        this.onActiveSelectAuditRow();
        break;
      case 'Update':
        this.onActiveSelectRow();
        break;
    }
  }

  handleSubmit(row: any) {
    console.log(row);
    console.log('submitBtn');
  }
}
