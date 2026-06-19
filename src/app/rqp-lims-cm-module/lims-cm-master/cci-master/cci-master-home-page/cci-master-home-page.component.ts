import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CciMasterService } from '../cci-master.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api-service/api.service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { CciMasterCreateUpdateComponent } from '../cci-master-create-update/cci-master-create-update.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';

@Component({
  selector: 'app-cci-master-home-page',
  templateUrl: './cci-master-home-page.component.html',
  styleUrls: ['./cci-master-home-page.component.scss'],
  standalone: false,
})
export class CciMasterHomePageComponent {
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
  allColumnCodeIndexTableDataUrl: any;
  activeColumnCodeIndexTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private cciMasterService: CciMasterService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allColumnCodeIndexTableDataUrl = apiEndPoints.allCciMasterTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.CciMasterUserProfileFilterData;
    this.activeColumnCodeIndexTableDataUrl =
      apiEndPoints.activeCciMasterTabledata;
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
    const dialogRef = this.dialog.open(CciMasterCreateUpdateComponent, {
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
      const dialogRef = this.dialog.open(CciMasterCreateUpdateComponent, {
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
      { labelName: 'Column Code', value: this.selectedRow.uc0001 },
      { labelName: 'Column Name', value: this.selectedRow.ff0001 },

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
        .sendRequest(apiEndPoints.CciMasterAllAuditTrail, 'GET', params)
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
          { labelName: 'Column Code', value: item.uc0001 },
          { labelName: 'Column Name', value: item.ff0001 },

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
    uc0001: 'Column Code',
    ff0001: 'Column Name',

    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Cci Master';
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
