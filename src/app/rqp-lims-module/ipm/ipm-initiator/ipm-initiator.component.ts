import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, timer, takeUntil } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { LimsService } from '../../lims.service';
import { ItemNameNoComponent } from 'src/app/common/item-name-no/item-name-no.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-ipm-initiator',
  standalone: false,
  templateUrl: './ipm-initiator.component.html',
  styleUrl: './ipm-initiator.component.scss',
   providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class IpmInitiatorComponent implements OnInit, OnDestroy {
  EventForm: FormGroup;
  UserRequirementForm: FormGroup;
  CCRequirementForm: FormGroup;
  public ViewDetailForm: FormGroup;
  isReadonly = true;
  selectedFiles: any;
  selectedFilesAttachment: any;
  uploadedDocfileName: any;
  documentDtoList: any[] = [];
  documentDtoListAttachment: any[] = [];
  UserRoleTable: any[] = [];
  UserRoleTableAttachment: any[] = [];
  selectedFileListAttachment: File[] = [];
  tableData: any;
  tableDataAttachment: any;
  isLoading = false;
  pageData: any;
  sList: any;
  oList: any;
  dList: any;
  lcMasterList: any;
  itemCategoryList: any;
  icsMasterList: any;
  rctMasterList: any;
  ctMasterList: any;
  nextStageListData: any;
  headerRequestBody: any;
  actionTypeList: any;
  headerData: any;
  displayedColumns: any;
  selectedDialogData: any;
  isRiskFlag = false;
  mediumRisk = false;
  noRisk = false;
  isStatusSuccess: boolean;
  draftValue: boolean;
  body1: any;
  comments: string;
  destroy$ = new Subject<void>();
  public courseList: any[] = [];
  public moduleTypeList: any;
  AddedUserdisplayedColumns: string[] = [
    'documentName',
    // 'categoryTypes',
    'removeRow',
  ];
  AddedUserdisplayedColumnsAttachment: string[] = [
    'documentName',
    'categoryTypes',
    'removeRow',
  ];
  constructor(
    public router: ActivatedRoute,
    private limsService: LimsService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private lifeCycleDataService: LifeCycleDataService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private toolbarService: ToolbarService,
    public buttonLabelService: ButtonLabelService,
    private route: Router,
    private cookieService: CookieService,
    private adminService: AdminService,
    private remoteLoader: RemoteComponentLoaderService
  ) {
    this.EventForm = this.fb.group({
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
      ff0004: [''],
      ff0005: [''],
      severityEvent: [''],
      severityEvent1: [''],
      severityEvent2: [''],
      severityEvent3: [''],
      severityEvent4: [''],
      nextStage: [''],
    });
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
    this.UserRequirementForm = this.fb.group({
      comments: [''],
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
    });
    this.CCRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
      attachmentName: [''],
      documentName: [''],
      categoryTypes: [''],
      attachmenentCategoryTypes: [''],
    });
  }

  actionDtoList: any = [
    {
      uc0001: null,
      ff0001: '',
      ff0002: '',
      ff0003: '',
      ff0004: '',
      ff0005: '',
      ff0006: '',
      ff0007: '',
      ff0008: '',
      ff0009: '',
      ff0010: '',
      ff0011: '',
      ff0012: '',
      ff0013: '',
      ff0014: '',
      ff0015: '',
      ff0016: '',
      lc0001: '',
      lc0002: '',
      lc0003: '',
      lc0004: '',
      lc0005: '',
      lc0006: '',
      createdby: '',
      status: '',
      comments: '',
      actionAttachmentList: [],
    },
  ];

  ccLineItemIndexDTOList: any = [
    {
      ff0001: '',
      ff0002: '',
      ff0003: '',
      ff0004: '',
      ccLineDesDTOList: [{}],
    },
  ];
  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'cc-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();

    this.limsService
      .getInput(this.cookieService.get('buCode'))
      .subscribe(({ data }: any) => {
        this.courseList = data.crList;
      });

    this.onloadDropDown();
  }
  ngAfterViewInit(): void {}
  public onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };

    this.limsService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      console.log(this.nextStageListData);
    });
  }

  onloadDropDown() {
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.moduleTypeList = data.data.moduletype;
    });
  }

  public addCourseList(index: number) {
    console.log(this.headerData);
    this.displayedColumns = [
      { field: 'crName', title: 'Name' },
      { field: 'crCode', title: 'Code' },
    ];

    if (this.courseList.length > 0 && this.moduleTypeList.length > 0) {
      const dialogRef = this.dialog.open(ItemNameNoComponent, {
        height: '500px',
        width: '1200px',
        data: {
          dialogTitle: 'Status',
          dialogColumns: this.displayedColumns,
          dialogData: this.courseList,
          lovName: 'statusList',
          ff0004: this.headerData.unitcode,
          index: index,
          moduleTypeList: this.moduleTypeList,
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(({ data }) => {
        if (data) {
          this.actionDtoList[index].ff0006 = data[0].ff0001;
          this.actionDtoList[index].ff0005 = data[0].uc0001;
        }
      });
    }
  }

  onLoadInputApi() {
    console.log(this.headerData);
    let businessunit = this.headerData.unitcode;
    let module = 'CCA';
    let mainModule = 'CC';
    this.limsService
      .onLoadInputNewAPI(businessunit, module, mainModule)
      .subscribe((data: any) => {
        console.log(data);
        this.sList = data.data.slist;
        this.oList = data.data.olist;
        this.dList = data.data.dlist;
        this.itemCategoryList = data.data.itemCategoryList;
        this.icsMasterList = data.data.icsMasterList;
        this.lcMasterList = data.data.lcMasterList;
        this.rctMasterList = data.data.rctMasterList;
        this.ctMasterList = data.data.ctMasterList;
        this.actionTypeList = data.data.actionTypeList;
        this.isReadonly = true;
      });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }

  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
    this.onLoadInputApi();
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
  }
  addLineItem(item: any): void {
    item.ccLineDesDTOList.push({
      value4: '',
      value5: '',
    });
    console.log(this.ccLineItemIndexDTOList);
  }
  addNewRow() {
    this.ccLineItemIndexDTOList.push({
      ff0001: '',
      ff0002: '',
      ff0003: '',
      ff0004: '',
      ccLineDesDTOList: [{}],
    });
  }
  deleteTodo(itemIndex: number, lineIndex: number): void {
    if (itemIndex >= 0 && itemIndex < this.ccLineItemIndexDTOList.length) {
      const item = this.ccLineItemIndexDTOList[itemIndex];
      if (lineIndex >= 0 && lineIndex < item.ccLineDesDTOList.length) {
        item.ccLineDesDTOList.splice(lineIndex, 1); // Remove the line item at the specified index
      }
    }
  }

  isEven(index: number): boolean {
    return index % 2 === 0;
  }
  addRemoveRow(row: any) {
    const index = this.actionDtoList.indexOf(row);
    if (index !== -1) {
      this.actionDtoList.splice(index, 1);
    }
  }
  addRemoveEventRow(row: any) {
    const index = this.ccLineItemIndexDTOList.indexOf(row);
    if (index !== -1) {
      this.ccLineItemIndexDTOList.splice(index, 1);
    }
  }

  /********************************LOV LIST ***************************************** */

  openSeverityEventLov() {
    this.displayedColumns = [
      { field: 'scode', title: 'Code' },
      { field: 'sname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Severity of the Event',
        dialogColumns: this.displayedColumns,
        dialogData: this.sList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0001'].setValue(result.data.sname);
        this.onGetRPNValue();
      }
    });
  }
  openOccurenceLov() {
    this.displayedColumns = [
      { field: 'ocode', title: 'Code' },
      { field: 'oname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Probability of Occurrence',
        dialogColumns: this.displayedColumns,
        dialogData: this.oList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0002'].setValue(result.data.oname);
        this.onGetRPNValue();
      }
    });
  }
  openDetectionLov() {
    this.displayedColumns = [
      { field: 'dcode', title: 'Code' },
      { field: 'dname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Detection Mechanism',
        dialogColumns: this.displayedColumns,
        dialogData: this.dList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0003'].setValue(result.data.dname);
        this.onGetRPNValue();
      }
    });
  }

  onGetRPNValue() {
    if (
      this.checkFieldValue(this.EventForm.controls['ff0001'].value) &&
      this.checkFieldValue(this.EventForm.controls['ff0002'].value) &&
      this.checkFieldValue(this.EventForm.controls['ff0003'].value)
    ) {
      let rpnValue =
        this.EventForm.controls['ff0001'].value *
        this.EventForm.controls['ff0002'].value *
        this.EventForm.controls['ff0003'].value;
      console.log(rpnValue);
      this.EventForm.controls['ff0004'].setValue(rpnValue);
      if (rpnValue <= 6) {
        this.isRiskFlag = false;
        this.mediumRisk = false;
        this.noRisk = true;
        this.EventForm.controls['ff0005'].setValue('Minor');
      } else if (rpnValue >= 7 && rpnValue <= 24) {
        this.isRiskFlag = false;
        this.mediumRisk = true;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('Major');
      } else if (rpnValue >= 25) {
        this.isRiskFlag = true;
        this.mediumRisk = false;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('Critical');
      } else {
        this.isRiskFlag = false;
        this.mediumRisk = false;
        this.noRisk = false;
        this.EventForm.controls['ff0005'].setValue('');
      }
    } else {
      this.EventForm.controls['ff0004'].setValue('');
      this.EventForm.controls['ff0005'].setValue('');
      this.isRiskFlag = false;
      console.log('else block');
    }
  }
  checkFieldValue(value: any) {
    if (value == '' || value == undefined || value == null) {
      return false;
    } else {
      return true;
    }
  }
  openItemCategoryLov(index: any) {
    this.displayedColumns = [
      { field: 'itemCode', title: 'Code' },
      { field: 'itemName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Category',
        dialogColumns: this.displayedColumns,
        dialogData: this.itemCategoryList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.ccLineItemIndexDTOList[index].ff0001 = result.data.itemCode;
      }
    });
  }
  openItemSubCategoryLov(index: any) {
    this.displayedColumns = [
      { field: 'icsCode', title: 'Code' },
      { field: 'icsName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.icsMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.ccLineItemIndexDTOList[index].ff0002 = result.data.icsCode;
      }
    });
  }

  /********************************************************************** */
  addActionItemRow() {
    // this.actionDtoList.push({

    // })
    this.actionDtoList.push({
      uc0001: null,
      ff0001: '',
      ff0002: '',
      ff0003: '',
      ff0004: '',
      ff0005: '',
      ff0006: '',
      ff0007: '',
      ff0008: '',
      ff0009: '',
      ff0010: '',
      ff0011: '',
      ff0012: '',
      ff0013: '',
      ff0014: '',
      ff0015: '',
      ff0016: '',
      lc0001: '',
      lc0002: '',
      lc0003: '',
      lc0004: '',
      lc0005: '',
      lc0006: '',
      createdby: '',
      status: '',
      comments: this.comments,
      actionAttachmentList: [{}],
    });
  }
  openLifeCycleNoLov(index: any) {
    this.displayedColumns = [
      { field: 'lcNumber', title: 'Lc Number' },
      { field: 'departmentCode', title: 'Department Code' },
      { field: 'moduleCode', title: 'Module Code' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.lcMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0001 = result.data.lcNumber;
        this.actionDtoList[index].ff0002 = result.data.departmentCode;
        this.actionDtoList[index].ff0014 = result.data.moduleCode;
      }
    });
  }
  openActionTypeLov(index: any) {
    this.displayedColumns = [
      { field: 'aname', title: 'Action Type' },
      { field: 'acode', title: 'Action Type Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Action Type',
        dialogColumns: this.displayedColumns,
        dialogData: this.actionTypeList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0003 = result.data.aname;
        this.actionDtoList[index].ff0013 = result.data.acode;
      }
    });
  }

  onChangeLifeCycle(index: any) {
    if (this.actionDtoList[index].ff0001 == '') {
      this.actionDtoList[index].ff0001 = '';
      this.actionDtoList[index].ff0002 = '';
      this.actionDtoList[index].ff0014 = '';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionDtoList[index].ff0001;
      this.lcMasterList.forEach((elements) => {
        if (elements.lcNumber == statusCurrentValue) {
          this.actionDtoList[index].ff0002 = elements.departmentCode;
          this.actionDtoList[index].ff0014 = elements.moduleCode;
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.actionDtoList[index].ff0001 = '';
        this.actionDtoList[index].ff0002 = '';
        this.actionDtoList[index].ff0014 = '';
        this.openLifeCycleNoLov(index);
      }
    }
  }
  onChangeDepartmentCode(index: any) {
    if (this.actionDtoList[index].ff0002 == '') {
      this.actionDtoList[index].ff0001 = '';
      this.actionDtoList[index].ff0002 = '';
      this.actionDtoList[index].ff0014 = '';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionDtoList[index].ff0002;
      this.lcMasterList.forEach((elements) => {
        if (elements.departmentCode == statusCurrentValue) {
          this.actionDtoList[index].ff0001 = elements.lcNumber;
          this.actionDtoList[index].ff0014 = elements.moduleCode;
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.actionDtoList[index].ff0001 = '';
        this.actionDtoList[index].ff0002 = '';
        this.actionDtoList[index].ff0014 = '';
        this.openLifeCycleNoLov(index);
      }
    }
  }
  onChangeModuleCode(index: any) {
    if (this.actionDtoList[index].ff0014 == '') {
      this.actionDtoList[index].ff0001 = '';
      this.actionDtoList[index].ff0002 = '';
      this.actionDtoList[index].ff0014 = '';
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.actionDtoList[index].ff0014;
      this.lcMasterList.forEach((elements) => {
        if (elements.moduleCode == statusCurrentValue) {
          this.actionDtoList[index].ff0001 = elements.lcNumber;
          this.actionDtoList[index].ff0002 = elements.departmentCode;
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.actionDtoList[index].ff0001 = '';
        this.actionDtoList[index].ff0002 = '';
        this.actionDtoList[index].ff0014 = '';
        this.openLifeCycleNoLov(index);
      }
    }
  }

  openActionItemCategoryLov(index: any) {
    this.displayedColumns = [
      { field: 'itemCode', title: 'Code' },
      { field: 'itemName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Category',
        dialogColumns: this.displayedColumns,
        dialogData: this.itemCategoryList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0004 = result.data.itemCode;
      }
    });
  }
  openActionItemSubCategoryLov(index: any) {
    this.displayedColumns = [
      { field: 'icsCode', title: 'Code' },
      { field: 'icsName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Item Subcategory',
        dialogColumns: this.displayedColumns,
        dialogData: this.icsMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0015 = result.data.icsCode;
      }
    });
  }
  openActionRootCauseLov(index: any) {
    this.displayedColumns = [
      { field: 'ctCode', title: 'Code' },
      { field: 'ctName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Root Cause',
        dialogColumns: this.displayedColumns,
        dialogData: this.ctMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0010 = result.data.ctCode;
      }
    });
  }
  openActionRootCauseTypeLov(index: any) {
    this.displayedColumns = [
      { field: 'rctCode', title: 'Code' },
      { field: 'rctName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Root Cause Type',
        dialogColumns: this.displayedColumns,
        dialogData: this.rctMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.actionDtoList[index].ff0009 = result.data.rctCode;
      }
    });
  }
  openNextStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }
  onChangeNextStage() {}
  async onSaveConfirmation(btnStatus: any) {
    console.log(btnStatus);
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );
    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onSaveUpdate('0');
        }
      }
    });
  }
  async onSubmit(btnStatus: any) {
    console.log(btnStatus);
    const component = await this.remoteLoader.loadComponentByKey(
      'CommonESignatureComponent'
    );
    const dialogRef = this.dialog.open(component, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onSaveUpdate('1');
        }
      }
    });
  }
  formatRequestBody() {
    this.body1 = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        stage2: this.EventForm.controls['nextStage'].value,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },
      actionDtoList: this.actionDtoList,
      eventClasificationDtoList: [
        {
          ff0001: this.EventForm.controls['ff0001'].value,
          ff0002: this.EventForm.controls['ff0002'].value,
          ff0003: this.EventForm.controls['ff0003'].value,
          ff0004: this.EventForm.controls['ff0004'].value,
          ff0005: this.EventForm.controls['ff0005'].value,
          ff0006: 'string',
          ff0007: 'string',
          ff0008: 'string',
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 'string',
          lc0005: 'string',
          lc0006: 'string',
          createdby: 'string',
          status: 0,
          comments: this.comments,
        },
      ],
      ccCommonDataDtoList: [
        {
          ff0001: this.UserRequirementForm.controls['ff0001'].value, //description
          ff0002: this.UserRequirementForm.controls['ff0002'].value, //start date
          ff0003: this.UserRequirementForm.controls['ff0003'].value, //end date
          ff0004: '2024-04-04T06:47:36.746Z',
          ff0005: 'string',
          ff0006: 'string',
          ff0007: 'string',
          ff0008: 'string',
          ff0009: '2025-01-30T08:21:36.531Z',
          ff0010: '2025-01-30T08:21:36.531Z',
          ff0011: 'string',
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 0,
          lc0005: 'string',
          lc0006: 'string',
          createdby: 'string',
          status: 0,
          comments: this.comments,
        },
      ],
      ccLineItemDtoList: [
        {
          ccLineItemIndexDTOList: [...this.ccLineItemIndexDTOList],
          ff0008: 'string',
          ff0009: 'string',
          ff0010: 'string',
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 'string',
          lc0005: 'string',
          lc0006: 'string',
          createdby: 'string',
          status: 0,
          comments: this.comments,
        },
      ],
      // attachmentDtoList: [
      //   {
      //     ff0001: 'string',
      //     ff0002: 'string',
      //     ff0003: 'string',
      //     ff0004: 'string',
      //     ff0005: 'string',
      //     ff0006: 'string',
      //     ff0007: 'string',
      //     ff0008: 'string',
      //     ff0009: 0,
      //     ff0010: 0,
      //     ff0011: 0,
      //     ff0012: 0,
      //     ff0013: 'string',
      //     ff0014: 'string',
      //     lc0001: 'string',
      //     lc0002: 'string',
      //     lc0003: 'string',
      //     lc0004: 'string',
      //     lc0005: 'string',
      //     lc0006: 'string',
      //     createdby: 'string',
      //     status: 0,
      //     comments: this.comments,
      //   },
      // ],
      // "ccAttachmentList": [
      //   {
      //     "uc0001": "string",
      //     "ff0001": "string",
      //     "ff0005": "A",
      //     "documentAction": "CREATE"
      //   }
      // ],
      ccAttachmentList: [...this.UserRoleTableAttachment],
    };
    this.actionDtoList.forEach((action) => {
      if (
        !action.ccLineItemIndexDTOList ||
        (Array.isArray(action.ccLineItemIndexDTOList) &&
          action.ccLineItemIndexDTOList.length === 1 &&
          Object.keys(action.ccLineItemIndexDTOList[0]).length === 0)
      ) {
        action.ccLineItemIndexDTOList = [];
      }
    });
    console.log(this.body1.ccLineItemDtoList);
    console.log(this.body1.ccLineItemDtoList[0].ccLineItemIndexDTOList);
    console.log(this.body1);
  }

  onSaveUpdate(btnStatus: any) {
    console.log(this.actionDtoList);
    console.log(this.ccLineItemIndexDTOList);
    if (
      this.EventForm.controls['nextStage'].value == '' ||
      this.EventForm.controls['nextStage'].value == undefined
    ) {
      this.EventForm.controls['nextStage'].setValue(0);
    }

    if (btnStatus == 1) {
      this.draftValue = false;
    } else {
      this.draftValue = true;
    }

    this.isLoading = true;
    let actionAttachmentList: any[] = [];
    let bodyData = this.formatRequestBody();
    console.log(this.body1);
    //this.body1.actionDtoList.
    console.log(this.body1.actionDtoList);
    //  this.body1.actionDtoList.forEach(obj => {
    //   // Check if actionAttachmentList exists in the current object
    //   if (obj.actionAttachmentList) {
    //     // Push each element of actionAttachmentList into actionAttachmentList array
    //     obj.actionAttachmentList.forEach(attachment => {
    //       actionAttachmentList.push(attachment.selectedFileList);
    //     });
    //   }
    // });
    const rowWiseActionAttachmentList = [];
    this.body1.actionDtoList.forEach((obj) => {
      if (obj.actionAttachmentList) {
        const currentRowAttachments = [];
        obj.actionAttachmentList.forEach((attachment) => {
          currentRowAttachments.push(attachment.selectedFileList);
        });
        rowWiseActionAttachmentList.push(currentRowAttachments);
      }
    });
    console.log(rowWiseActionAttachmentList);

    console.log(actionAttachmentList);
    let attachmentList: any[] = [];
    console.log(this.body1.ccAttachmentList);
    this.body1.ccAttachmentList.forEach((obj) => {
      console.log(obj.selectedFileList);
      if (obj.selectedFileList) {
        attachmentList.push(obj.selectedFileList);
      }
    });
    console.log(attachmentList);
    console.log(actionAttachmentList);
    this.limsService
      .onCCSaveUpdate(rowWiseActionAttachmentList, attachmentList, this.body1)
      .subscribe((data: any) => {
        // console.log(data)
        console.log(this.body1);
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqpquailtyui/qms/cc-home');
            });
        }
        this.isLoading = false;
      });
  }

  /*******************ADDITIONAL CHANGES **************************************/

  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
    }
  }
  handleFileInputAttachment(event: any) {
    this.selectedFilesAttachment = event.target.files[0];
    if (this.selectedFilesAttachment) {
      this.uploadedDocfileName = this.selectedFilesAttachment.name;
    }
  }
  selectedFileList: File[] = [];
  onCreateSelectedDataList(item) {
   
    console.log(item.actionAttachmentList);
    // Check if the document name is provided before proceeding
    if (this.CCRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      item.actionAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        documentName: this.CCRequirementForm.controls['documentName'].value,
        // categoryTypes: 'A',
        ff0001: this.CCRequirementForm.controls['documentName'].value,
        ff0005: 'A',
        documentAction: 'CREATE',
      });

      let filteredObjects = this.filterEmptyObjects(item.actionAttachmentList);
      item.actionAttachmentList = filteredObjects;
      // this.tableData = new MatTableDataSource(item.actionAttachmentList);
      this.tableData = item.actionAttachmentList;
    } else {
      console.log('Document name is empty, not adding actionAttachmentList');
    }
  }
  filterEmptyObjects(objects: any[]): any[] {
    return objects.filter((obj) => Object.keys(obj).length > 0);
  }
  removeRow(row: any) {
    const index = this.actionDtoList.actionAttachmentList.indexOf(row);
    if (index !== -1) {
      this.actionDtoList.actionAttachmentList.splice(index, 1);
    }
    // this.documentDtoList = this.UserRoleTable;
    console.log(this.UserRoleTable);
    this.tableData = new MatTableDataSource(
      this.actionDtoList.actionAttachmentList
    );
  }
  onCreateSelectedDataListAttachment() {
    this.selectedFileListAttachment.push(this.selectedFiles);
    this.UserRoleTableAttachment.push({
      uc0001: null,
      selectedFileList: this.selectedFilesAttachment,
      documentName: this.CCRequirementForm.controls['documentName'].value,
      // categoryTypes: this.CCRequirementForm.controls['categoryTypes'].value,
      ff0001: this.CCRequirementForm.controls['documentName'].value,
      ff0005: 'A',
      documentAction: 'CREATE',
    });
    
    console.log(this.UserRoleTableAttachment);
    this.tableDataAttachment = new MatTableDataSource(
      this.UserRoleTableAttachment
    );
  }
  removeRowAttachment(row: any) {
    const index = this.UserRoleTableAttachment.indexOf(row);
    if (index !== -1) {
      this.UserRoleTableAttachment.splice(index, 1);
    }
    console.log(this.UserRoleTableAttachment);
    this.tableDataAttachment = new MatTableDataSource(
      this.UserRoleTableAttachment
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
