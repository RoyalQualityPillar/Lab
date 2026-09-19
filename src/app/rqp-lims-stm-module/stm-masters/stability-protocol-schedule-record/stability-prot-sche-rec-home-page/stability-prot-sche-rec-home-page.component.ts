import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { StabilityProtScheRecServiceService } from '../stability-prot-sche-rec-service.service';
import { StabilityProtScheRecCreateUpdateComponent } from '../stability-prot-sche-rec-create-update/stability-prot-sche-rec-create-update.component';

@Component({
  selector: 'app-stability-prot-sche-rec-home-page',
  standalone: false,
  templateUrl: './stability-prot-sche-rec-home-page.component.html',
  styleUrl: './stability-prot-sche-rec-home-page.component.scss'
})
export class StabilityProtScheRecHomePageComponent implements OnInit, AfterViewInit {
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
 allSpsrTabledataUrl: any;
  activeSpsrTabledataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;
   selectedRow: any;
  // allSamRegTabledataUrl: apiEndPoints;

  constructor(
    private router: Router,
private stabilityProtScheRecServiceService : StabilityProtScheRecServiceService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) { }
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allSpsrTabledataUrl = apiEndPoints.allSpsrTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.SpsrUserProfileFilterData;
    this. activeSpsrTabledataUrl = apiEndPoints.activeSpsrTabledata;
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
      compRef.setInput('apiUrl', this.allSpsrTabledataUrl);
      compRef.setInput('tableTitle', 'All Stability  Protocol Schedule Record');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Stability  Protocol Schedule Record');

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
      compRef.setInput('apiUrl', this. activeSpsrTabledataUrl);
      compRef.setInput('tableTitle', 'All Stability  Protocol Schedule Record');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Stability  Protocol Schedule Record');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Stability  Protocol Schedule Record table filter:', error);
    }
  }

  ngAfterViewInit(): void { }
  selectedTab = 0;
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  tabChanged(tabChangeEvent: any) { }
 
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(StabilityProtScheRecCreateUpdateComponent, {
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
      const dialogRef = this.dialog.open(StabilityProtScheRecCreateUpdateComponent, {
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
      { labelName: 'Station No', value: this.selectedRow.uc0001 },
      { labelName: 'Station', value: this.selectedRow.ff0001 },
      { labelName: 'Schdule No', value: this.selectedRow.ff0002},
      { labelName: 'Stability Protocol No', value: this.selectedRow.ff0003},
      { labelName: 'Storage Condition', value: this.selectedRow.ff0004},
      { labelName: 'Station UOM', value: this.selectedRow.ff0005},
      { labelName: 'Withdrawal Date', value: this.selectedRow.ff0006},
       { labelName: 'Withdrawal Tolerance Date ', value: this.selectedRow.ff0007},
      { labelName: 'Genartion Type', value: this.selectedRow.ff0008},
    { labelName: 'withdrawal Qty', value: this.selectedRow.ff0009},

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
        data: { tableData: tableData, pageTitle: ' Stability  Protocol Schedule Record' },
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

       this.stabilityProtScheRecServiceService 
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
               { labelName: 'Station No', value: this.selectedRow.uc0001 },
      { labelName: 'Station', value: this.selectedRow.ff0001 },
      { labelName: 'Schdule No', value: this.selectedRow.ff0002},
      { labelName: 'Stability Protocol No', value: this.selectedRow.ff0003},
      { labelName: 'Storage Condition', value: this.selectedRow.ff0004},
      { labelName: 'Station UOM', value: this.selectedRow.ff0005},
      { labelName: 'Withdrawal Date', value: this.selectedRow.ff0006},
       { labelName: 'Withdrawal Tolerance Date ', value: this.selectedRow.ff0007},
      { labelName: 'Genartion Type', value: this.selectedRow.ff0008},
    { labelName: 'withdrawal Qty', value: this.selectedRow.ff0009},
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
      data: { tableData: rows, pageTitle: ' Stability  Protocol Schedule Record ' },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  columnConfig = {
   	   
		    action: 'Action',
    uc0001: 'Station No',
    ff0001: 'Station',
    ff0002: 'Schdule No',
    ff0003: 'Stability Protocol No',
    ff0004: 'Storage Condition',
     ff0005: 'Station UOM',
     ff0006: 'Withdrawal Date',
     ff0007: 'Withdrawal Tolerance Date ',
    ff0008: 'Genartion Type',
   ff0009: 'withdrawal Qty',
    // ff0005: 'STP No',
    // ff0006: 'Batch No./Sample Ref No',
    // ff0007: 'Batch Size',
    // ff0008: 'Batch size UOM',
    // ff0009: 'Referance Standrad No',
    // ff0010: 'W.S Validity in day',
    // ff0011: 'Storage Condition',
    // ff0012: 'Quantity for testing',
    // ff0013: 'Quantity for Working standard',
    // ff0014: 'Total Qty',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All  Stability  Protocol Schedule Record';
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
  
  }
}



{

}

