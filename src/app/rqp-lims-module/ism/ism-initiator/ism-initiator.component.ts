import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil, timer } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { LimsService } from 'src/app/service/lims.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { ItemNameNoComponent } from 'src/app/common/item-name-no/item-name-no.component';
import { GtpService } from 'src/app/service/gtp.service';

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
  selector: 'app-ism-initiator',
  standalone: false,
  templateUrl: './ism-initiator.component.html',
  styleUrl: './ism-initiator.component.scss'
})
export class IsmInitiatorComponent implements OnInit, OnDestroy {
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
  UserRoleTableAssessment: any[] = [];
  selectedFileListAttachment: File[] = [];
  tableData: any;
  tableDataAttachment: any;
  tableDataAssessment: any;
  isLoading = false;
  pageData: any;
  dueDate: Date = new Date();
  sList: any;
  oList: any;
  dList: any;
  reqList: any;
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
  AddedDocumentdisplayedColumnsAttachment: string[] = [
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
    private gtpService: GtpService,
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
      status: [''],
      title: [''],
      market: [''],
      customerName: [''],
      // changeClassification: [''],
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
      //unitcode: this.cookieService.get('buCode'),
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
      ff0017: '',
      lc0001: '',
      lc0002: '',
      lc0003: '',
      lc0004: '',
      lc0005: '',
      lc0006: '',
      createdby: '',
      status: 0,
      comments: '',
      actionAttachmentList: [],
    },
  ];

  ccLineItemIndexDTOList: any = [
    {
     // unitcode: this.cookieService.get('buCode'),
      ff0001: '',
      ff0002: '',
      ff0003: '',
      ff0004: '',
      ccLineDesDTOList: [{}],
    },
  ];
  ngOnInit(): void {
    const today = new Date();
    const formattedDate = this.formatDate(today);
    this.UserRequirementForm.controls['ff0002'].setValue(formattedDate);
    this.onloadDropDown();
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'cc-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();

    this.gtpService
      .getInput(this.cookieService.get('buCode'))
      .subscribe(({ data }: any) => {
        this.courseList = data.crList;
        console.log(data);
      });

  }
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  ngAfterViewInit(): void { }
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

    //if (this.courseList.length > 0 && this.moduleTypeList.length > 0) {
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
    // }
  }

  onLoadInputApi() {
    console.log(this.headerData);
    let unitCode = this.headerData.unitcode;
    let module = 'CCA';
    let mainModule = 'CC';
    this.limsService
      .onLoadInputNewAPI(unitCode, module, mainModule)
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
        this.reqList = data.data.reqList;
        this.isReadonly = true;
      });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
    this.actionDtoList.comments = this.comments;
  }

  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
    this.onLoadInputApi();
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
    this.UserRequirementForm.controls['status'].setValue('Open');

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
  filteredOlist: any[] = [];
  filteredDlist: any[] = [];
  // Apply filtering logic based on selected severity
  applySeverityFilter(selectedSeverity: number) {
    if (!selectedSeverity) {
      this.filteredOlist = [...this.oList];
      this.filteredDlist = [...this.dList];
      return;
    }

    // Filter Probability of Occurrence based on Severity
    this.filteredOlist = this.oList.filter((o) => o.oname <= selectedSeverity);

    // Get the selected Probability of Occurrence
    const selectedProbability = this.EventForm.get('ff0002')?.value;

    // Filter Detection Mechanism based on Probability of Occurrence
    if (selectedProbability) {
      this.filteredDlist = this.dList.filter((d) => d.dname <= selectedProbability);
    } else {
      this.filteredDlist = [...this.dList];
    }

    // Clear invalid selections
    const probCtrl = this.EventForm.get('ff0002');
    const detectCtrl = this.EventForm.get('ff0003');

    if (probCtrl && probCtrl.value > selectedSeverity) {
      probCtrl.setValue(null);
    }
    if (detectCtrl && detectCtrl.value > selectedProbability) {
      detectCtrl.setValue(null);
    }
  }
  openSeverityEventLov() {
    this.displayedColumns = [
      { field: 'scode', title: 'Severity Name' },
      { field: 'sname', title: 'Severity Code' },
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
        this.applySeverityFilter(result.data.sname); // Apply filter after selecting severity
        this.EventForm.controls['ff0003'].setValue(""); // Clear detection mechanism on severity change
        this.EventForm.controls['ff0002'].setValue("");
        this.onGetRPNValue();
      }
    });
  }
  openOccurenceLov() {
    this.displayedColumns = [
      { field: 'ocode', title: 'Probability Name' },
      { field: 'oname', title: 'Probability Code' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Probability of Occurrence',
        dialogColumns: this.displayedColumns,
        //dialogData: this.oList,
        dialogData: this.filteredOlist,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.EventForm.controls['ff0002'].setValue(result.data.oname);
        this.applySeverityFilter(result.data.oname); // Apply filter after selecting occurrence
        this.EventForm.controls['ff0003'].setValue(""); // Clear detection mechanism on occurrence change
        this.onGetRPNValue();
      }
    });
  }
  openDetectionLov() {
    this.displayedColumns = [
      { field: 'dcode', title: 'Detection Name' },
      { field: 'dname', title: 'Detection Code' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Detection Mechanism',
        dialogColumns: this.displayedColumns,
        dialogData: this.filteredDlist,
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
      this.calculateEndDate();
    } else {
      this.EventForm.controls['ff0004'].setValue('');
      this.EventForm.controls['ff0005'].setValue('');
      this.isRiskFlag = false;
      console.log('else block');
    }
  }
  calculateEndDate() {
    const changeDetectionValue = this.EventForm.controls['ff0005'].value;
    const selectedModule = 'CC';
    const today = new Date();

    const reqItem = this.reqList.find((item) => item.ff0006 === selectedModule);

    if (reqItem) {
      let daysToAdd = 0;

      if (changeDetectionValue === 'Critical') {
        daysToAdd = reqItem.ff0001; // Critical
      } else if (changeDetectionValue === 'Minor') {
        daysToAdd = reqItem.ff0002; // Minor
      } else if (changeDetectionValue === 'Major') {
        daysToAdd = reqItem.ff0003; // Major
      }

      const endDate = new Date(today);
      endDate.setDate(today.getDate() + daysToAdd);

      const formattedEndDate = this.formatDate(endDate);

      this.UserRequirementForm.controls['ff0003'].setValue(formattedEndDate);
    } else {
      console.error('No matching reqList item found for the selected module.');
      this.UserRequirementForm.controls['ff0003'].setValue('');
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
      { field: 'itemCode', title: 'Item Name' },
      { field: 'itemName', title: 'Item Code' },
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
      { field: 'icsCode', title: 'Item Subcategory Name' },
      { field: 'icsName', title: 'Item Subcategory Code' },
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
      ff0017: '',
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
        dialogTitle: 'LifeCycle Info',
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
      { field: 'itemCode', title: 'Item Category Name' },
      { field: 'itemName', title: 'Item Category Code' },
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
      { field: 'icsCode', title: 'Item Subcategory Name' },
      { field: 'icsName', title: 'Item Subcategory Code' },
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
  onChangeNextStage() { }
  async onSaveConfirmation(btnStatus: any) {
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
    let startRaw = this.UserRequirementForm.controls['ff0002'].value;
    const startDate = moment()
  .utc()
  .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    let endRaw = this.UserRequirementForm.controls['ff0003']?.value;

    const endDate = moment(endRaw, 'DD-MM-YYYY', true).isValid()
      ? moment(endRaw, 'DD-MM-YYYY')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      : null;
    // let endDate1 = moment(
    //   this.UserRequirementForm.controls['ff0003'].value
    // ).format('DD-MM-YYYY HH:mm:ss.SSS');
    // const endDate = moment(endDate1, 'DD-MM-YYYY HH:mm:ss.SSS')
    //   .utc() // Convert to UTC
    //   .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
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
          unitcode: this.headerData.unitcode,
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
          createdby: this.headerData.createdby,
          status: 0,
          comments: this.comments,
        },
      ],
      ccCommonDataDtoList: [
        {
          unitcode: this.headerData.unitcode,
          ff0001: this.UserRequirementForm.controls['ff0001'].value, //description
          ff0002: startDate, //start date
          ff0003: endDate, //end date
          ff0004: '2024-04-04T06:47:36.746Z',
          ff0005: 'string',
          ff0006: 'string',
          ff0007: 'string',
          ff0008: 'string',
          ff0009: '2025-01-30T08:21:36.531Z',
          ff0010: '2025-01-30T08:21:36.531Z',
          ff0011: 'string',
          // ff0012: this.UserRequirementForm.controls['departmentCode'].value,
          // ff0013: this.UserRequirementForm.controls['market'].value,
          // ff0014: this.UserRequirementForm.controls['customerName'].value,
          // ff0015: this.UserRequirementForm.controls['changeClassification'].value,
          ff0012: this.UserRequirementForm.controls['title'].value,
          ff0013: this.UserRequirementForm.controls['status'].value,
          ff0014: this.UserRequirementForm.controls['market'].value,
          ff0015: this.UserRequirementForm.controls['customerName'].value,
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 0,
          lc0005: 'string',
          lc0006: 'string',
          createdby: this.headerData.createdby,
          status: 0,
          comments: this.comments,
        }
      ],
      ccLineItemDtoList: [
        {
          unitcode: this.headerData.unitcode,
          ff0008: 'string',
          ff0009: 'string',
          ff0010: 'string',
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 'string',
          lc0005: 'string',
          lc0006: 'string',
          createdby: this.headerData.createdby,
          status: 0,
          comments: this.comments,
          ccLineItemIndexDTOList: [...this.ccLineItemIndexDTOList],

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
      riskAttachmentList: [...this.UserRoleTableAssessment],
    };
    // this.actionDtoList.forEach((action) => {
    //   if (
    //     !action.ccLineItemIndexDTOList ||
    //     (Array.isArray(action.ccLineItemIndexDTOList) &&
    //       action.ccLineItemIndexDTOList.length === 1 &&
    //       Object.keys(action.ccLineItemIndexDTOList[0]).length === 0)
    //   ) {
    //     action.ccLineItemIndexDTOList = [];
    //   }
    // });
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
    this.body1.actionDtoList.forEach(obj => {
      // Check if actionAttachmentList exists in the current object
      if (obj.actionAttachmentList) {
        // Push each element of actionAttachmentList into actionAttachmentList array
        obj.actionAttachmentList.forEach(attachment => {
          actionAttachmentList.push(attachment.selectedFileList);
        });
      }
    });
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
    let riskAttachment: any[] = [];
    this.body1.riskAttachmentList.forEach((obj) => {
      console.log(obj.selectedFileList);
      if (obj.selectedFileList) {
        riskAttachment.push(obj.selectedFileList);
      }
    });
    console.log(attachmentList);
    console.log(actionAttachmentList);
    console.log(riskAttachment);
    this.limsService
      .onISMSaveUpdate(rowWiseActionAttachmentList, attachmentList, riskAttachment, this.body1)
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
    // Ensure actionAttachmentList is properly initialized
    // if (!item.actionAttachmentList) {
    // item.actionAttachmentList = [{}];
    //}
    console.log(item.actionAttachmentList);
    // Check if the document name is provided before proceeding
    if (this.CCRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      item.actionAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        // documentName: this.CCRequirementForm.controls['documentName'].value,
        // categoryTypes: 'A',
        ff0001: this.CCRequirementForm.controls['documentName'].value,
        ff0005: 'AT',
        "ff0013": "string",
        ff0015: "att",
        "lc0002": "string",
        "lc0003": "string",
        "lc0004": "string",
        documentAction: 'CREATE',
        "documnetType": "CREATE"
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
      ff0005: 'AT',
      ff0015: 'att',
      documentAction: 'CREATE',
    });
    // this.documentDtoListAttachment.push({
    //   uc0001:null,
    //   selectedFileList: this.selectedFilesAttachment,
    //   ff0001: this.CCRequirementForm.controls['documentName'].value,
    //   ff0005: this.CCRequirementForm.controls['categoryTypes'].value,
    //   documentAction:'CREATE'
    // });
    console.log(this.UserRoleTableAttachment);
    this.tableDataAttachment = new MatTableDataSource(
      this.UserRoleTableAttachment
    );
  }
  onCreateSelectedDataListAssessment() {
    this.selectedFileListAttachment.push(this.selectedFiles);
    this.UserRoleTableAssessment.push({
      uc0001: null,
      selectedFileList: this.selectedFilesAttachment,
      documentName: this.CCRequirementForm.controls['documentName'].value,
      // categoryTypes: this.CCRequirementForm.controls['categoryTypes'].value,
      ff0001: this.CCRequirementForm.controls['documentName'].value,
      ff0005: 'RA',
      ff0015: 'risk',
      documentAction: 'CREATE',
      documnetType: 'CREATE'
    });
    // this.documentDtoListAttachment.push({
    //   uc0001:null,
    //   selectedFileList: this.selectedFilesAttachment,
    //   ff0001: this.CCRequirementForm.controls['documentName'].value,
    //   ff0005: this.CCRequirementForm.controls['categoryTypes'].value,
    //   documentAction:'CREATE'
    // });
    console.log(this.UserRoleTableAssessment);
    this.tableDataAssessment = new MatTableDataSource(
      this.UserRoleTableAssessment
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
