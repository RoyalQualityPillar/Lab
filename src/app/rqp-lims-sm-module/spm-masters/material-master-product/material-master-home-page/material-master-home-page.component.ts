import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { CreateUpdateMaterialMasterComponent } from '../../material-master-product/create-update-material-master/create-update-material-master.component';
import { changeStatusByCode } from 'src/app/common/removeEmptyStrings';
import { ApiService } from 'src/app/service/api-service/api.service';
import { CookieService } from 'ngx-cookie-service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { MaterialMasterService } from '../material-master.service';

@Component({
  selector: 'app-material-master-home-page',
  templateUrl: './material-master-home-page.component.html',
  styleUrls: ['./material-master-home-page.component.scss'],
  standalone: false,
})
export class MaterialMasterHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('tableWrapper', { static: true }) tableWrapper: ElementRef;
  @ViewChild('commonTableContainer', { read: ViewContainerRef, static: true })
  commonTableContainer!: ViewContainerRef;
  @ViewChild('activeRoleMasterContainer', { read: ViewContainerRef })
  activeRoleMasterContainer!: ViewContainerRef;
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
  isFilterExpanded = true;
  allMaterialMasterTableDataUrl: any;
  activeMaterialMasterTableDataUrl: any;
  filterApiUrl: any;
  params: any;
  HttpMethod = 'POST';
  getLatestData = false;

  constructor(
    private router: Router,
    private materialService: MaterialMasterService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    private apiService: ApiService,
    private remoteLoader: RemoteComponentLoaderService
  ) {}
  filterObject: any;
  activeUserFilterObject: any;
  ngOnInit(): void {
    this.allMaterialMasterTableDataUrl =
      apiEndPoints.allMaterialMasterTabledata;
    this.pageIndex = 0;
    let size = GlobalConstants.size;
    let pageIndex = this.pageIndex;
    let unitCode = this.cookieService.get('buCode');
    this.params = { pageIndex, size, unitCode };
    this.filterApiUrl = apiEndPoints.MaterialMasterUserProfileFilterData;
    this.activeMaterialMasterTableDataUrl =
      apiEndPoints.activeMaterialMasterTabledata;
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
      compRef.setInput('apiUrl', this.allMaterialMasterTableDataUrl);
      compRef.setInput('tableTitle', 'All Material Master');
      compRef.setInput('dynamicButtons', this.allButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Material Master');

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
      compRef.setInput('apiUrl', this.activeMaterialMasterTableDataUrl);
      compRef.setInput('tableTitle', 'Active Material Master');
      compRef.setInput('dynamicButtons', this.activeButtonConfig);
      compRef.setInput('columnClass', 'rqp-life-cycle-table-columns');
      compRef.setInput('filterApiUrl', this.filterApiUrl);
      compRef.setInput('HttpMethod', this.HttpMethod);
      compRef.setInput('params', this.params);
      compRef.setInput('getLatestData', this.getLatestData);
      compRef.setInput('downloadFileName', 'Material Master');

      // 🔧 Safely subscribe to output
      (compRef.instance as any).buttonClick.subscribe((event: any) => {
        this.activeHandleButtonAction(event);
      });
    } catch (error) {
      console.error('Error loading Active Role Master table filter:', error);
    }
  }
  ngAfterViewInit(): void { }
  selectedTab = 0;

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  tabChanged(tabChangeEvent: any) {}

  selectedRow: any;
  onOpenRolePOPUP() {
    const dialogRef = this.dialog.open(CreateUpdateMaterialMasterComponent, {
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
      const dialogRef = this.dialog.open(CreateUpdateMaterialMasterComponent, {
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
      { labelName: 'Material No', value: this.selectedRow.uc0001 },
      { labelName: 'Material Code ', value: this.selectedRow.ff0001 },
      { labelName: 'Material Name', value: this.selectedRow.ff0002 },
      // { labelName: 'Brand Name', value: this.selectedRow.ff0003 },
      { labelName: 'Plant Code', value: this.selectedRow.ff0004 },
      { labelName: 'Product Category', value: this.selectedRow.ff0005 },
      { labelName: 'UOM', value: this.selectedRow.ff0007 },
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
        data: { tableData: tableData, pageTitle: 'Material Master' },
      });
      dialogRef.afterClosed().subscribe((result) => {});
    }
  }
  UC0001: any;
  UC0002: any;
  columnConfig = {
    action: 'Action',
    uc0001: 'Material No',
    ff0002: 'Material Name',
    ff0001: 'Material Code',
    // ff0003: 'Brand Name',
    ff0004: 'Plant Code',
    ff0005: 'Product Categoty',
    status: 'Status',
    version: 'Version',
    createdon: 'CreatedOn',
    createdby: 'CreatedBy',
  };

  filterOptions: string[] = Object.keys(this.columnConfig);
  tableTitle: string = 'All Material Master';
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
        this.onActiveSelectAuditRow();
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
        this. onActiveSelectRow();
        break;
    }
  }

  handleSubmit(row: any) {
    console.log('submitBtn');
  }
}
