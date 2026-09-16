import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewContainerRef,
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
import { MaterialTypeService } from '../material-type.service';
import { MaterialTypeCreateUpdateComponent } from '../material-type-create-update/material-type-create-update.component';
import { exportData } from 'bk-export';

import { GlobalConstants } from 'src/app/common/global-constants';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
//import { CommonActiveAuditTrailComponent } from 'src/app/common/common-active-audit-trail/common-active-audit-trail.component';
//import { CommonAllAuditTrailComponent } from 'src/app/common/common-all-audit-trail/common-all-audit-trail.component';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-material-type-home-page',
  templateUrl: './material-type-home-page.component.html',
  styleUrls: ['./material-type-home-page.component.scss'],
  standalone: false,
})
export class MaterialTypeHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('commonTableContainer', { read: ViewContainerRef, static: true })
  commonTableContainer!: ViewContainerRef;
  @ViewChild('activeRoleMasterContainer', { read: ViewContainerRef })
  activeRoleMasterContainer!: ViewContainerRef;
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  //   'action',
  //   'uc0001',
  //   'ff0001',
  //   'ff0002',
  //   'status',
  //   'version',
  //   'createdon',
  //   'createdby',
  // ];
  // activeRoleMasterdisplayedColumns: string[] = [
  //   'action',
  //   'uc0001',
  //   'ff0001',
  //   'ff0002',
  //   'status',
  //   'version',
  //   'createdon',
  //   'createdby',
  // ];
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
  allMaterialTypeTableDataUrl: any;
  activeMaterialTypeTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  selectedRow: any;
  getLatestData = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public toolbarService: ToolbarService,
    public lifeCycleDataService: LifeCycleDataService,
    public cookieService: CookieService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private remoteLoader: RemoteComponentLoaderService,
    public materialTypeService: MaterialTypeService
  ) {}

  ngOnInit(): void {
    this.allMaterialTypeTableDataUrl = apiEndPoints.allMaterialTypeTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.materialTypeUserProfileFilterData;
    this.activeMaterialTypeTableDataUrl =
      apiEndPoints.activeMaterialTypeTabledata;
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
    this.loadRoleMasterTableFilter();
    this.loadActiveRoleMasterTableFilter();
  }
  async loadRoleMasterTableFilter() {
    try {
      const component = await this.remoteLoader.loadComponentByKey(
        'CommonTableFilterComponent'
      );

      const compRef = this.commonTableContainer.createComponent(component);

      // Set all required inputs
      compRef.setInput('columnConfig', this.columnConfig);
      compRef.setInput('filterOptions', this.filterOptions);
      compRef.setInput('apiUrl', this.allMaterialTypeTableDataUrl);
      compRef.setInput('tableTitle', 'All Material Type');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Material Type');

      // Subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.handleButtonAction(event);
      });
    } catch (error) {
      console.error('Failed to load CommonTableFilterComponent:', error);
    }
  }
  async loadActiveRoleMasterTableFilter() {
    try {
      const component = await this.remoteLoader.loadComponentByKey(
        'CommonTableFilterComponent'
      );

      const compRef = this.activeRoleMasterContainer.createComponent(component);

      compRef.setInput('columnConfig', this.columnConfig);
      compRef.setInput('filterOptions', this.filterOptions);
      compRef.setInput('apiUrl', this.activeMaterialTypeTableDataUrl);
      compRef.setInput('tableTitle', 'Active Material Type');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Material Type');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Role Master table filter:', error);
    }
  }

  ngAfterViewInit() {}
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {}
  activeUserSelectedRowData: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(MaterialTypeCreateUpdateComponent, {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Registration' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLatestData = true;
    });
    this.getLatestData = false;
  }
  setSelectedID(row: any) {
    console.log(row);
    this.setSelectedID = row;
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
      const dialogRef = this.dialog.open(MaterialTypeCreateUpdateComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  onChangeStatus(data: any) {
    return changeStatusByCode(data);
  }
  async onActiveSelectAuditRow() {
    let tableData = [
      { labelName: 'Version', value: this.selectedRow.version },
      {
        labelName: 'Status',
        value: this.onChangeStatus(this.selectedRow.status),
      },
      { labelName: 'Material Type Number', value: this.selectedRow.uc0001 },
      { labelName: 'Material Type Name', value: this.selectedRow.ff0001 },
      { labelName: 'Business Unit Code', value: this.selectedRow.ff0002 },
      { labelName: 'Material Type Code', value: this.selectedRow.ff0003 },
      { labelName: 'Category', value: this.selectedRow.uc0002 },
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
      const component = await this.remoteLoader.loadComponentByKey(
        'CommonActiveAuditTrailComponent'
      );
      const dialogRef = this.dialog.open(component, {
        minWidth: '80%',
        data: { tableData: tableData, pageTitle: 'Material Type' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  onSearchAllAuditTrail() {
    this.selectedRow = this.selectedRow;
    console.log(this.selectedRow);
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      let UC0001 = this.selectedRow.uc0001;
      const params = { UC0001 };
      this.apiService
        .sendRequest(apiEndPoints.materialTypeAllAuditTrail, 'GET', params)
        .subscribe((data: any) => {
          let newFormatData = this.structureResponse(data.data);
          this.isLoading = false;
        });
    }
  }
  formatedData: any;
  async structureResponse(apiResponse: any) {
    const rows = apiResponse.map((item) => {
      return {
        fields: [
          { labelName: 'Version', value: item.version },
          {
            labelName: 'Status',
            value: this.onChangeStatus(item.status),
          },
          { labelName: 'Material Type Number', value: item.uc0001 },
          { labelName: 'Material Type Name', value: item.ff0001 },
          { labelName: 'Business Unit Code', value: item.ff0002 },
          { labelName: 'Material Type Code', value: item.ff0003 },
          { labelName: 'Category', value: item.uc0002 },
          { labelName: 'Createdon', value: item.createdon },
          { labelName: 'Createdby', value: item.createdby },
          { labelName: 'Comments', value: item.comments },
        ],
      };
    });
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonAllAuditTrailComponent'
    );
    const dialogRef = this.dialog.open(component, {
      minWidth: '80%',
      data: { tableData: rows, pageTitle: 'Role' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  columnConfig = {
    action: 'Action',
    ff0001: 'Material Type Name',
    uc0001: 'Material Type Number',
    ff0002: 'Organization Unit Code',
    ff0003: 'Material Type Code',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
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
