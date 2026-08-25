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
import { SampleTextPlanService } from '../sample-text-plan.service';
import { CreateUpdateSampleTextPlanComponent } from '../create-update-sample-text-plan/create-update-sample-text-plan.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-sample-text-plan',
  standalone: false,
  templateUrl: './home-page-sample-text-plan.component.html',
  styleUrl: './home-page-sample-text-plan.component.scss'
})
export class HomePageSampleTextPlanComponent implements OnInit, AfterViewInit {
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
  allStpTableDataUrl: any;
  activeStpTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;
  allStpTabledataUrl: apiEndPoints;

  constructor(
    private router: Router,
    private sampleTextPlanService: SampleTextPlanService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) { }
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allStpTableDataUrl = apiEndPoints.allStpTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.StpUserProfileFilterData;
    this.activeStpTableDataUrl = apiEndPoints.activeStpTabledata;
    this.params = { pageIndex, size, unitCode };
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
      compRef.setInput('apiUrl', this.allStpTableDataUrl);
      compRef.setInput('tableTitle', 'All Sample Text Plan');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', ' Sample Text Plan');

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
      compRef.setInput('apiUrl', this.activeStpTableDataUrl);
      compRef.setInput('tableTitle', 'Active Sample Text Plan');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Sample Text Plan');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Sample Text Plan Master table filter:', error);
    }
  }

  ngAfterViewInit(): void { }
  selectedTab = 0;
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) { }
  public downloadOrgDocument(row:any) {
    const templateName = 'stpws.html';
    const moduleCode = 'STD';
    this.sampleTextPlanService.generateReport(
      row.uc0001,
      templateName,
      moduleCode
    )
      .subscribe((data: any) => {
        let fileExtension = 'pdf';
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
        blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = templateName + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
 selectedRow: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(CreateUpdateSampleTextPlanComponent, {
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
      const dialogRef = this.dialog.open(CreateUpdateSampleTextPlanComponent, {
        minWidth: '80%',
        data: { tableData: this.selectedRow, type: 'Modification' },
      });
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
      { labelName: 'Test No', value: this.selectedRow.uc0001 },
      { labelName: 'Test Code ', value: this.selectedRow.ff0001 },
      { labelName: 'Test Name', value: this.selectedRow.ff0002 },
      { labelName: 'Lifecycle No', value: this.selectedRow.ff0003 },
      { labelName: 'Selction', value: this.selectedRow.ff0004 },
      { labelName: 'AR.No', value: this.selectedRow.ff0005 },
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
        data: { tableData: tableData, pageTitle: 'Sample Text Plan' },
      });
      dialogRef.afterClosed().subscribe((result) => { });
    }
  }
  UC0001: any;
  UC0002: any;
  async onSearchAllAuditTrail() {
    this.selectedRow = this.selectedRow;
    if (this.selectedRow.length == 0) {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
    } else {
      this.isLoading = true;

      this.sampleTextPlanService
        .onAllRoleAuditTrail(this.selectedRow.uc0001)
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
          { labelName: 'Test No', value: item.uc0001 },
          { labelName: 'Test Code', value: item.ff0001 },
          { labelName: 'Test Name', value: item.ff0002 },
          { labelName: 'Lifecycle No', value: item.ff0003 },
          { labelName: 'Selction', value: item.ff0004 },
          { labelName: 'AR.No', value: item.ff0005 },
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
      data: { tableData: rows, pageTitle: 'Sample Text Plan' },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'Test No',
    ff0001: 'Test Code',
    ff0002: 'Test Name',
    ff0003: 'Lifecycle No',
    // ff0004: 'Selction',
    // ff0005: 'AR.No',
    
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Sample Text Plan';
  allButtonConfig = [
    { label: ' Audit Trail', action: 'Audit_Trail', color: 'primary' },
    { label: ' DownLoad', action: 'Down_Load', color: 'primary' },

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
       case 'Down_Load':
          this.downloadOrgDocument(row);
          break;
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
