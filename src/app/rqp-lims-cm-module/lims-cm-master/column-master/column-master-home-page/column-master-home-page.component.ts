import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ColumnMasterService } from '../column-master.service';
import { ColumnMasterCreateUpdateComponent } from '../column-master-create-update/column-master-create-update.component';

@Component({
  selector: 'app-column-master-home-page',
  templateUrl: './column-master-home-page.component.html',
  styleUrls: ['./column-master-home-page.component.scss'],
  standalone: false,
})
export class ColumnMasterHomePageComponent {
  [x: string]: any;
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  isLoading = false;
  pageIndex: number;
  size: number;
  filterFieldError = false;
  filterValueError = false;
  activeUserFilterFieldError = false;
  activeUserFilterValueError = false;
  tableData: MatTableDataSource<any>;
  isFilterExpanded = false;
  allColumnMasterTableDataUrl: any;
  activeColumnMasterTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private columnMasterService: ColumnMasterService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allColumnMasterTableDataUrl = apiEndPoints.allColumnMasterTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.ColumnMasterUserProfileFilterData;
    this.activeColumnMasterTableDataUrl =
      apiEndPoints.activeColumnMasterTabledata;
    this.params = { pageIndex, size, unitCode };
    console.log('Bharat');
    this.filterObject = {
      field: 'SELECT',
      value: '',
      condition: 'equals',
      DateFieldvalue1: '',
      DateFieldvalue2: '',
    };
    this.activeUserFilterObject = {
      field: 'SELECT',
      value: '',
      condition: 'equals',
      DateFieldvalue1: '',
      DateFieldvalue2: '',
    };
  }
  ngAfterViewInit(): void {}
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  selectedTab = 0;
  tabChanged(tabChangeEvent: any) {
    // this.selectedTab = tabChangeEvent.index;
    // if (this.selectedTab == 0) {
    //   this.onLoadAllSaleProductMaster();
    // } else if (this.selectedTab == 1) {
    //   this.onLoadActiveSaleProductMaster();
    // }
  }

  selectedRow: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(ColumnMasterCreateUpdateComponent, {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLatestData = true;
    });
    this.getLatestData = false;
  }
  setSelectedID(row: any) {
    console.log(row);
    this.selectedAllId = row;
  }
  selectedAllId: any;
  setSelectedAllID(row: any) {
    this.selectedAllId = row;
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
      const dialogRef = this.dialog.open(ColumnMasterCreateUpdateComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Update' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
  onActiveSelectAuditRow() {
    let tableData = [
      { labelName: 'Version', value: this.selectedRow.version },
      {
        labelName: 'Status',
        value: this.onChangeStatus(this.selectedRow.status),
      },
      { labelName: 'Column No', value: this.selectedRow.uc0001 },
      { labelName: 'Column Type' ,value:this.selectedRow.ff0001 },
       { labelName: 'Make / Model', value: this.selectedRow.ff0002 },
      { labelName: 'Dimensions', value: this.selectedRow.ff0003 },
      {labelName: 'Serial Number', value: this.selectedRow.ff0004,},
      { labelName: 'Batch No', value: this.selectedRow.ff0005 },
      { labelName: 'Vendor Name', value: this.selectedRow.ff0006 },
      { labelName: 'Date of Receipt', value: this.selectedRow.ff0007 },
      { labelName: 'Storage Condition', value: this.selectedRow.ff0008 },
      { labelName: 'Invoice No', value: this.selectedRow.ff0009 },

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
        data: { tableData: tableData, pageTitle: 'Colomn Master ' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  UC0001: any;
  UC0002: any;

  onSearchAllAuditTrail() {
    this.selectedAllId = this.selectedRow;
    console.log(this.selectedAllId);
    if (this.selectedAllId.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      // this.glService
      //   .onAllRoleAuditTrail(this.selectedAllRow.uc0001)
      //   .subscribe((data: any) => {
      let UC0001 = this.selectedAllId.uc0001;

      const params = { UC0001 };
      this.apiService
        .sendRequest(apiEndPoints.ColumnMasterAllAuditTrail, 'GET', params)
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
           { labelName: 'Column No', value: this.selectedRow.uc0001 },
      { labelName: 'Column Type' ,value:this.selectedRow.ff0001 },
       { labelName: 'Make / Model', value: this.selectedRow.ff0002 },
      { labelName: 'Dimensions', value: this.selectedRow.ff0003 },
      {labelName: 'Serial Number', value: this.selectedRow.ff0004,},
      { labelName: 'Batch No', value: this.selectedRow.ff0005 },
      { labelName: 'Vendor Name', value: this.selectedRow.ff0006 },
      { labelName: 'Date of Receipt', value: this.selectedRow.ff0007 },
      { labelName: 'Storage Condition', value: this.selectedRow.ff0008 },
      { labelName: 'Invoice No', value: this.selectedRow.ff0009 },

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
    uc0001: 'Column No',
    ff0001: 'Column Type',
    ff0002: 'Make / Model',
    ff0003: 'Dimensions',
    ff0004: 'Serial Number',
    ff0005: 'Batch No',
    ff0006: 'Vendor Name',
    ff0007: 'Date of Receipt',
    ff0008: 'Storage Condition',
    ff0009: 'Invoice No',

    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Column Master';
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
