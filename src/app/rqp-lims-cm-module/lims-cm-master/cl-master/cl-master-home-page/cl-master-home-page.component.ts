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
import { ClMasterService } from '../cl-master.service';
import { ClMasterCreateUpdateComponent } from '../cl-master-create-update/cl-master-create-update.component';

@Component({
  selector: 'app-cl-master-home-page',
  templateUrl: './cl-master-home-page.component.html',
  styleUrls: ['./cl-master-home-page.component.scss'],
  standalone: false,
})
export class ClMasterHomePageComponent {
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
  allColumnLotTableDataUrl: any;
  activeColumnLotTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private clMasterService: ClMasterService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allColumnLotTableDataUrl = apiEndPoints.allClMasterTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.ClMasterUserProfileFilterData;
    this.activeColumnLotTableDataUrl = apiEndPoints.activeClMasterTabledata;
    this.params = { pageIndex, size, unitCode };
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
    const dialogRef = this.dialog.open(ClMasterCreateUpdateComponent, {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Create' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLatestData = true;
    });
    this.getLatestData = false;
  }
  setSelectedID(row: any) {
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
      const dialogRef = this.dialog.open(ClMasterCreateUpdateComponent, {
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
      { labelName: 'Column Lot No', value: this.selectedRow.uc0001 },
      { labelName: 'Column Lot Code', value: this.selectedRow.ff0001 },
      { labelName: 'Manfacture Lot No.', value: this.selectedRow.ff0002 },
      { labelName: 'COA', value: this.selectedRow.ff0003 },

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
        data: { tableData: tableData, pageTitle: 'Gi Master ' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  UC0001: any;
  UC0002: any;

  onSearchAllAuditTrail() {
    this.selectedAllId = this.selectedRow;
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
        .sendRequest(apiEndPoints.ClMasterAllAuditTrail, 'GET', params)
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
          { labelName: 'Column Lot No', value: this.selectedRow.uc0001 },
          { labelName: 'Column Lot Code', value: this.selectedRow.ff0001 },
          { labelName: 'Manfacture Lot No.', value: this.selectedRow.ff0002 },
          { labelName: 'COA', value: this.selectedRow.ff0003 },

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
    uc0001: 'Column Lot No',
    ff0001: 'Column Lot Code',
    ff0002: 'Manfacture Lot No.',
    ff0003: 'COA',

    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Cl Master';
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
    console.log('submitBtn');
  }
}
