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
import { CreateUpdateWsLotRecordComponent } from '../create-update-ws-lot-record/create-update-ws-lot-record.component';
import { WsLotRecordService } from '../ws-lot-record.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-ws-lot-record',
  standalone: false,
  templateUrl: './home-page-ws-lot-record.component.html',
  styleUrl: './home-page-ws-lot-record.component.scss'
})
export class HomePageWsLotRecordComponent implements OnInit, AfterViewInit {
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
  allWlrTableDataUrl: any;
  activeWlrTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private wsLotRecordService: WsLotRecordService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allWlrTableDataUrl = apiEndPoints.allWlrTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.WlrUserProfileFilterData;
    this.activeWlrTableDataUrl = apiEndPoints.activeWlrTabledata;
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
      compRef.setInput('apiUrl', this. allWlrTableDataUrl);
      compRef.setInput('tableTitle', 'Active WS Lot Record');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', ' WS Lot Record');

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
      compRef.setInput('apiUrl', this.activeWlrTableDataUrl);
      compRef.setInput('tableTitle', 'Active WS Lot Record');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'WS Lot Record');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active WS Lot Record table filter:', error);
    }
  }
  ngAfterViewInit(): void {}
  selectedTab = 0;
  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {}

  selectedRow: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(CreateUpdateWsLotRecordComponent, {
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
      const dialogRef = this.dialog.open(CreateUpdateWsLotRecordComponent, {
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
      { labelName: 'WS.Lot No', value: this.selectedRow.uc0001 },
      { labelName: 'Product Code', value: this.selectedRow.ff0001 },
      { labelName: 'Lot type', value: this.selectedRow.ff0002 },
      { labelName: 'Sample Ref.No', value: this.selectedRow.ff0003 },
      { labelName: 'Conatainer Type', value: this.selectedRow.ff0004 },
      { labelName: 'Storage Conditon', value: this.selectedRow.ff0005 },
      { labelName: 'Lot Quantity', value: this.selectedRow.ff0006 },
      { labelName: 'Lot Quantity UOM', value: this.selectedRow.ff0007 },
      { labelName: 'Manfacture Date', value: this.selectedRow.ff0008 },
      { labelName: 'Expiry date', value: this.selectedRow.ff0009 },
      { labelName: 'Batch No', value: this.selectedRow.ff0010 },
      { labelName: 'Source Batch No', value: this.selectedRow.ff0011 },
      { labelName: 'WS. Vailidity ON', value: this.selectedRow.ff0012 },
      { labelName: 'Lot Validity Up to', value: this.selectedRow.ff0013 },
      { labelName: 'Usage Type', value: this.selectedRow.ff0014 },
      { labelName: 'No of Purities', value: this.selectedRow.ff0015 },
      { labelName: 'No of Purities  UOM', value: this.selectedRow.ff0016 },
      { labelName: 'Conatainer Validity Days', value: this.selectedRow.ff0017 },
      { labelName: 'ConatainerContainer Satrting No', value: this.selectedRow.ff0018 },
      { labelName: 'No Of Container', value: this.selectedRow.ff0019 },
      { labelName: 'Alert Coantainer No', value: this.selectedRow.ff0020 },
      { labelName: 'Total Coantainer QTY', value: this.selectedRow.ff0021 },
      { labelName: 'Total Coantainer UOM', value: this.selectedRow.ff0022 },
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
        data: { tableData: tableData, pageTitle: 'WS Lot Record' },
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

      this.wsLotRecordService
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
          { labelName: 'WS.Lot No', value: item.uc0001 },
          { labelName: 'Product Code', value: item.ff0001 },
          { labelName: 'Lot type', value: item.ff0002 },
          { labelName: 'Sample Ref.No', value: item.ff0003 },
          { labelName: 'Conatainer Type', value: item.ff0004 },
          { labelName: 'Storage Conditon', value: item.ff0005 },
          { labelName: 'Lot Quantity', value: item.ff0006 },
          { labelName: 'Lot Quantity UOM', value: item.ff0007 },          
          { labelName: 'Manfacture Date', value: item.ff0008 },          
          { labelName: 'Expiry date', value: item.ff0009 },          
          { labelName: 'Batch No', value: item.ff0010 },          
          { labelName: 'Source Batch No', value: item.ff0011 },          
          { labelName: 'WS. Vailidity ON', value: item.ff0012 },          
          { labelName: 'Lot Validity Up to', value: item.ff0013 },          
          { labelName: 'Usage Type', value: item.ff0014 },          
          { labelName: 'No of Purities', value: item.ff0015 },          
          { labelName: 'No of Purities  UOM', value: item.ff0016 },          
          { labelName: 'Conatainer Validity Days', value: item.ff0017 },          
          { labelName: 'Container Satrting No', value: item.ff0018 },          
          { labelName: 'No Of Container', value: item.ff0019 },          
          { labelName: 'Alert Coantainer No', value: item.ff0020 },          
          { labelName: 'Total Coantainer QTY', value: item.ff0021 },          
          { labelName: 'Total Coantainer UOM', value: item.ff0022 },          
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
      data: { tableData: rows, pageTitle: 'WS Lot Record' },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  columnConfig = {
    action: 'Action',
    uc0001: 'WS.Lot No',
    ff0001: 'Product Code',
    ff0002: 'Lot type ',
    ff0003: 'Sample Ref.No',
    ff0004: 'Conatainer Type',
    ff0005: 'Storage Conditon',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All WS Lot Record';
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



