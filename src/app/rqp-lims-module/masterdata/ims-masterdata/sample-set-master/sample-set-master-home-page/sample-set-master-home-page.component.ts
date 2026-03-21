import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { SampleSetMasterService } from '../sample-set-master.service';
import { SampleSetMasterCreateUpdateComponent } from '../sample-set-master-create-update/sample-set-master-create-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-set-master-home-page',
  standalone: false,
  templateUrl: './sample-set-master-home-page.component.html',
  styleUrl: './sample-set-master-home-page.component.scss'
})
export class SampleSetMasterHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('commonTableContainer', { read: ViewContainerRef, static: true })
  commonTableContainer!: ViewContainerRef;
  @ViewChild('activeRoleMasterContainer', { read: ViewContainerRef })
  activeRoleMasterContainer!: ViewContainerRef;
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
  allSampleSetMasterTabledataUrl: any;
   activeSampleSetMasterTabledataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
      private sampleSetMasterService: SampleSetMasterService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService

  ) { }
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allSampleSetMasterTabledataUrl =
      apiEndPoints.allSampleSetTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.SampleSetUserProfileFilterData;
    this.activeSampleSetMasterTabledataUrl =
      apiEndPoints.activeSampleSetTabledata;
    this.params = { pageIndex, size, unitCode };
    console.log('Bharat');
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
      compRef.setInput('apiUrl', this.allSampleSetMasterTabledataUrl);
      compRef.setInput('tableTitle', 'All Sample Set Master');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', ' Sample Set Master');

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
      compRef.setInput('apiUrl', this.activeSampleSetMasterTabledataUrl);
      compRef.setInput('tableTitle', 'Active Sample Set Master');

      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', ' Sample Set Master');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Sample Set Master table filter:', error);
    }
  }

  ngAfterViewInit(): void { }
  selectedTab = 0;

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  tabChanged(tabChangeEvent: any) { }

  selectedRow: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(SampleSetMasterCreateUpdateComponent , {
      minWidth: '80%',
      data: { tableData: this.selectedRow, type: 'Registration' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getLatestData = true;
      this.refreshData();
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
      const dialogRef = this.dialog.open(
        SampleSetMasterCreateUpdateComponent ,
        {
          minWidth: '80%',
          data: { tableData: this.selectedRow, type: 'Modification' },
        }
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.getLatestData = true;
        this.refreshData();
      });
      this.getLatestData = false;

    }
  }
  refreshData() {
    this.loadRoleMasterTableFilter();
    this.loadActiveRoleMasterTableFilter();
     this.commonTableContainer.clear()
     this.activeRoleMasterContainer.clear()

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
      { labelName: 'Sample Set No', value: this.selectedRow.uc0001 },
      { labelName: 'Sample Set Id', value: this.selectedRow.ff0001 },
      { labelName: 'Sample Set Name', value: this.selectedRow.ff0002 },
      { labelName: 'Project Name', value: this.selectedRow.ff0003 },
      { labelName: 'Analyst', value: this.selectedRow.ff0004 },
      // { labelName: 'Created On', value: this.selectedRow.ff0005 },
      // { labelName: 'Last Modified On', value: this.selectedRow.ff0006 },
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
        data: { tableData: tableData, pageTitle: 'Sample Set Master' },
      });
      dialogRef.afterClosed().subscribe((result) => { });
    }
  }

  UC0001: any;
  // UC0002: any;
  onSearchAllAuditTrail() {
    this.selectedAllId = this.selectedRow;
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

      this.sampleSetMasterService
        .onAllRoleAuditTrail(this.selectedAllId.uc0001)
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
          { labelName: 'Sample Set No', value: item.uc0001 },
          { labelName: 'Sample Set Id', value: item.ff0001 },
          { labelName: 'Sample Set Name', value: item.ff0002 },
          { labelName: 'Project Name', value: item.ff0003 },
          { labelName: 'Analyst', value: item.ff0004 },
          // { labelName: 'Created On', value: item.ff0005 },
          // { labelName: 'Last Modified On', value: item.ff0006 },
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
      data: { tableData: rows, pageTitle: ' Sample Set Master' },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'Sample Set No',
    ff0001: 'Sample Set Id',
    ff0002: 'Sample Set Name',
    ff0003: 'Project Name',
    ff0004: 'Analyst',
    // ff0005: 'Created On',
    // ff0006: 'Last Modified On',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Sample Set Master';
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




