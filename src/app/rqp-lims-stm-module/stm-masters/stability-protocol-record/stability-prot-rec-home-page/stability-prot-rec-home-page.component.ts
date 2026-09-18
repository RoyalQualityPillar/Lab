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
import { StabilityProtRecCreateUpdateComponent } from '../stability-prot-rec-create-update/stability-prot-rec-create-update.component';
import { StabilityProtRecServiceService } from '../stability-prot-rec-service.service';

@Component({
  selector: 'app-stability-prot-rec-home-page',
  standalone: false,
  templateUrl: './stability-prot-rec-home-page.component.html',
  styleUrl: './stability-prot-rec-home-page.component.scss'
})
export class StabilityProtRecHomePageComponent 
implements OnInit, AfterViewInit {
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
  allSprTabledataUrl: any;
  activeSprTabledataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;
   selectedRow: any;
  // allSamRegTabledataUrl: apiEndPoints;

  constructor(
    private router: Router,
    private stabilityProtRecServiceService: StabilityProtRecServiceService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) { }
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allSprTabledataUrl = apiEndPoints.allSprTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.SprUserProfileFilterData;
    this. activeSprTabledataUrl = apiEndPoints.activeSprTabledata;
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
      compRef.setInput('apiUrl', this.allSprTabledataUrl);
      compRef.setInput('tableTitle', 'All Stability Protocol Record ');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Stability Protocol Record ');

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
      compRef.setInput('apiUrl', this. activeSprTabledataUrl);
      compRef.setInput('tableTitle', 'All  Stability Protocol Record');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Stability Protocol Record');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Stability Protocol Record table filter:', error);
    }
  }

  ngAfterViewInit(): void { }
  selectedTab = 0;
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }
  tabChanged(tabChangeEvent: any) { }
 
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(StabilityProtRecCreateUpdateComponent, {
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
      const dialogRef = this.dialog.open(StabilityProtRecCreateUpdateComponent, {
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
      { labelName: 'Stability Protocol No', value: this.selectedRow.uc0001 },
      { labelName: 'Stability Protocol Name', value: this.selectedRow.ff0001 },
      { labelName: 'Specification No', value: this.selectedRow.ff0002},
      { labelName: 'Product Code', value: this.selectedRow.ff0003},
      { labelName: 'Product Name', value: this.selectedRow.ff0004},
      { labelName: 'Batch No', value: this.selectedRow.ff0005},
      { labelName: 'Batch Size', value: this.selectedRow.ff0006},
      { labelName: 'Batch Size UOM', value: this.selectedRow.ff0007},
      { labelName: 'Manfacturing Date ', value: this.selectedRow.ff0008},
      { labelName: 'Pack Type', value: this.selectedRow.ff0009},
      { labelName: 'Market', value: this.selectedRow.ff0010},
      { labelName: 'Custumer Name', value: this.selectedRow.ff0011},
      { labelName: 'No of API', value: this.selectedRow.ff0012},
      { labelName: 'API Source', value: this.selectedRow.ff0013},
      { labelName: 'Start Date ', value: this.selectedRow.ff0014},
      { labelName: 'Initial Analysis  availabe', value: this.selectedRow.ff0015},
      { labelName: 'No Of stoarge Conditons', value: this.selectedRow.ff0016},
      { labelName: 'No of Tetsing Points', value: this.selectedRow.ff0017},
      { labelName: 'Stability Start Date', value: this.selectedRow.ff0018},
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
        data: { tableData: tableData, pageTitle: 'Stability Protocol Record' },
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

      this.stabilityProtRecServiceService
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
           { labelName: 'Stability Protocol No', value: this.selectedRow.uc0001 },
      { labelName: 'Stability Protocol Name', value: this.selectedRow.ff0001 },
      { labelName: 'Specification No', value: this.selectedRow.ff0002},
      { labelName: 'Product Code', value: this.selectedRow.ff0003},
      { labelName: 'Product Name', value: this.selectedRow.ff0004},
      { labelName: 'Batch No', value: this.selectedRow.ff0005},
      { labelName: 'Batch Size', value: this.selectedRow.ff0006},
      { labelName: 'Batch Size UOM', value: this.selectedRow.ff0007},
      { labelName: 'Manfacturing Date ', value: this.selectedRow.ff0008},
      { labelName: 'Pack Type', value: this.selectedRow.ff0009},
      { labelName: 'Market', value: this.selectedRow.ff0010},
      { labelName: 'Custumer Name', value: this.selectedRow.ff0011},
      { labelName: 'No of API', value: this.selectedRow.ff0012},
      { labelName: 'API Source', value: this.selectedRow.ff0013},
      { labelName: 'Start Date ', value: this.selectedRow.ff0014},
      { labelName: 'Initial Analysis  availabe', value: this.selectedRow.ff0015},
      { labelName: 'No Of stoarge Conditons', value: this.selectedRow.ff0016},
      { labelName: 'No of Tetsing Points', value: this.selectedRow.ff0017},
      { labelName: 'Stability Start Date', value: this.selectedRow.ff0018},
      { labelName: 'Createdon', value: this.selectedRow.createdon },
      { labelName: 'Createdby', value: this.selectedRow.createdby },
      { labelName: 'Comments', value: this.selectedRow.comments },
      ],
      };
    });
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonAllAuditTrailComponent'
    );
    const dialogRef = this.dialog.open(component, {
      minWidth: '80%',
      data: { tableData: rows, pageTitle: 'Stability Protocol Record' },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'Stability Protocol No',
    ff0001: 'Stability Protocol Name',
    ff0002: 'Specification No',
    ff0003: 'Product Code',
    ff0004: 'Product Name',
     ff0005: 'Batch No',
    ff0006: 'Batch Size',
     ff0007: 'Batch Size UOM',
   ff0008: 'Manfacturing Date ',
     ff0009: 'Pack Type',
     ff0010: 'Market',
     ff0011: 'Custumer Name',
     ff0012: 'No of API',
     ff0013: 'API Source',
     ff0014: 'Start Date ',
     ff0015: 'Initial Analysis  availabe',
     ff0016: 'No Of stoarge Conditons',
     ff0017: 'No of Tetsing Points',
     ff0018: 'Stability Start Date',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Stability Protocol Record';
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




