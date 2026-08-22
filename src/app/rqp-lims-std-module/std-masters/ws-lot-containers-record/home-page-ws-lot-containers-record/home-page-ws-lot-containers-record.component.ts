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
import { WsLotContainersRecordService } from '../ws-lot-containers-record.service';
import { CreateUpdateWsLotContainersRecordComponent } from '../create-update-ws-lot-containers-record/create-update-ws-lot-containers-record.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-ws-lot-containers-record',
  standalone: false,
  templateUrl: './home-page-ws-lot-containers-record.component.html',
  styleUrl: './home-page-ws-lot-containers-record.component.scss'
})
export class HomePageWsLotContainersRecordComponent implements OnInit, AfterViewInit {
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
  allWlcrTableDataUrl: any;
  activeWlcrTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private wsLotContainersRecordService: WsLotContainersRecordService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allWlcrTableDataUrl = apiEndPoints.allWlcrTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.WlcrUserProfileFilterData;
    this.activeWlcrTableDataUrl = apiEndPoints.activeWlcrTabledata;
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
      compRef.setInput('apiUrl', this. allWlcrTableDataUrl);
      compRef.setInput('tableTitle', 'Active WS Lot Containers Record');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', ' WS Lot Containers Record');

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
      compRef.setInput('apiUrl', this.activeWlcrTableDataUrl);
      compRef.setInput('tableTitle', 'Active WS Lot Containers Record');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'WS Lot Containers Record');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active WS Lot Containers Record table filter:', error);
    }
  }
  ngAfterViewInit(): void {}
  selectedTab = 0;
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {}
  public downloadOrgDocument(row:any) {
    const templateName = 'wslcr.html';
    const moduleCode = 'STD';
    this. wsLotContainersRecordService.generateReport(
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
    const dialogRef = this.dialog.open(CreateUpdateWsLotContainersRecordComponent, {
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
      const dialogRef = this.dialog.open(CreateUpdateWsLotContainersRecordComponent, {
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
    refreshData(){
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
      { labelName: 'Container Code', value: this.selectedRow.uc0001 },
      { labelName: 'WS.Lot No', value: this.selectedRow.ff0001 },
      { labelName: 'Container Qty', value: this.selectedRow.ff0002 },
      { labelName: 'Value UOM', value: this.selectedRow.ff0003 },
      { labelName: 'Lot Valid Up to', value: this.selectedRow.ff0004 },
      { labelName: 'Catainer Valid Up to', value: this.selectedRow.ff0005 },
      { labelName: 'Availabe qty', value: this.selectedRow.ff0006 },
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
    }  else {
      const component = await this.remoteLoader.loadComponentByKey(
      'CommonActiveAuditTrailComponent'
    );
      
      const dialogRef = this.dialog.open(component, {
        minWidth: '80%',
        data: { tableData: tableData, pageTitle: 'WS Lot Containers Record' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
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
      this.wsLotContainersRecordService
        .onAllRoleAuditTrail(this.selectedRow.uc0001)
        .subscribe((data: any) => {
          let newFormatData = this.structureResponse(data.data);
          this.isLoading = false;
        });
    }
  }
  formatedData: any;
 async  structureResponse(apiResponse: any) {
    const rows = apiResponse.map((item) => {
      return {
        fields: [
          { labelName: 'Version', value: item.version },
          {
            labelName: 'Status',
            value: this.onChangeStatus(item.status),
          },
          { labelName: 'Container Code', value: item.uc0001 },
          { labelName: 'WS.Lot No', value: item.ff0001 },
          { labelName: 'Container Qty', value: item.ff0002 },
          { labelName: 'Value UOM', value: item.ff0003 },
          { labelName: 'Lot Valid Up to', value: item.ff0004 },              
          { labelName: 'Catainer Valid Up to', value: item.ff0005 },              
          { labelName: 'Availabe qty', value: item.ff0006 },              
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
      data: { tableData: rows, pageTitle: 'WS Lot Containers Record' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'Container Code',
    ff0001: 'WS.Lot No',
    ff0002: 'Container Qty',
    ff0003: 'Value UOM',
    ff0004: 'Lot Valid Up to',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All WS Lot Purities Record';
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



