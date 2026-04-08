import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { MatDialog } from '@angular/material/dialog';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import { CookieService } from 'ngx-cookie-service';
//import { DmsService } from 'src/app/rqp-dms-module/dms.service';
import { Router } from '@angular/router';
import { Subject, timer, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/common/notification.service';
//import { PmsListComponent } from '../pms-list/pms-list.component';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { CmService } from '../../cm.service';
import { PmsListComponent } from '../../pms-list/pms-list.component';
interface Row {
  files: File[];
}
@Component({
  selector: 'app-cm-initiator',
  standalone: false,
  templateUrl: './cm-initiator.component.html',
  styleUrls: ['./cm-initiator.component.scss']
})
export class CmInitiatorComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  public pageData: any;
  nextStageListData: any;
  comments: string;
  HeaderForm: FormGroup;
  UserRequirementForm: FormGroup;
  public ViewDetailForm: FormGroup;
  destroy$ = new Subject<void>();
  public disableButtons = false;
  isLoading: boolean;
  headerRequestBody: any;
  public selectedCourseList: any[];
  public psmList: any[] = [];
  public isSubjectCodeSuccess: boolean;
  // AddedUserdisplayedColumns: string[] = [
  //   'documentName',
  //   'categoryTypes',
  //   'removeRow',
  // ];
  AddedAttachmentisplayedColumns: string[] = [
    'attachmentName',
    'categoryTypes',
    'removeRow',
  ];
  public pmsList = new FormGroup({
    productNo: new FormControl(''),
  });

  constructor(
    private fb: FormBuilder,
    private cmService: CmService,
    private toolbarService: ToolbarService,
    public dialog: MatDialog,
    private lifeCycleDataService: LifeCycleDataService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router,
    private notificationService: NotificationService,
    private remoteLoader: RemoteComponentLoaderService,

  ) {
    this.HeaderForm = this.fb.group({
      productName: [''],
      market: [''],
      productCode: [''],
      uom: [''],
      shelfLifeMonths: [''],
      productType: [''],
      dosageForm: [''],
      inputCode: [''],
      productTrackingCode: [''],
      requestNo: [''],
      version: [''],
    });
    this.UserRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
      attachmentName: [''],
      documentName: [''],
      categoryTypes: [''],
      attachmenentCategoryTypes: ['A'],
    });
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'CM-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  // selectedDataList = {
  //   documentType: '',
  //   docNames: '',
  //   categoryTypes: '',
  //   attachement: File,
  //   documentName: '',
  // };
  selectedAttachmentDataList = {
    attachmentName: '',
  };
  testfile: any;
  selectedFiles: any;
  selectedAttachmentFiles: any;
  attachmentName: any;
  UserRoleTable: any[] = [];
  UserRoleAttachmentTable: any[] = [];
  tableData: any;
  tableAttachmentData: any;
  fileToUpload: File | null = null;
  uploadedDocfileName: any;

  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
      this.validateFileFormat(this.selectedFiles);
    }
  }
  validationMessage: any;
  isValidFileType: boolean = false;
  validateFileFormat(file: any) {
    if (
      file.name.includes('.') &&
      (file.name.split('.').pop() === 'docx' ||
        file.name.split('.').pop() === 'doc' ||
        file.name.split('.').pop() === 'pdf')
    ) {
      this.validationMessage = '';
      this.isValidFileType = true;
      return true;
    } else {
      this.validationMessage = 'Please upload .doc, .docx, or .pdf file.';
      this.isValidFileType = false;
      return false;
    }
  }
  uploadedAttachmentfileName: any;

  onChangeSubject() {
    if (this.pmsList.controls['productNo'].value == '') {
      this.pmsList.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.pmsList.controls['productNo'].value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.pmsList.controls['productNo'].setErrors({
          incorrect: true,
        });
        this.openStatusLOV();
      }
    }
  }

  openStatusLOV() {
    this.displayedColumns = [
      { field: 'productNO', title: 'Product No' },
      { field: 'productName', title: 'Product Name' },
    ];
    const dialogRef = this.dialog.open(PmsListComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Status',
        dialogColumns: this.displayedColumns,
        dialogData: this.psmList,
        lovName: 'statusList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.pmsList.controls['productNo'].setValue(
          this.selectedDialogData.productNO
        );

        this.cmService
          .productList(this.selectedDialogData.productNO)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.HeaderForm.setValue({
                dosageForm: element.ff0009,
                productName: element.ff0001,
                productCode: element.ff0002,
                market: element.ff0003,
                uom: element.ff0007,
                shelfLifeMonths: element.ff0005,
                productType: element.ff0008,
                inputCode: element.ff0010,
                productTrackingCode: element.ff0011,
                requestNo: element.ff0007,
                version: element.ff0008,
              });
            });
          });
      }
    });
  }
  handleAttachmentFileInput(event: any) {
    this.selectedAttachmentFiles = event.target.files[0];
    if (this.selectedAttachmentFiles) {
      this.uploadedAttachmentfileName = this.selectedAttachmentFiles.name;
    }
  }
  attachedRemoveRow(row: any) {
    const index = this.UserRoleAttachmentTable.indexOf(row);
    if (index !== -1) {
      this.UserRoleAttachmentTable.splice(index, 1);
    }
    this.tableAttachmentData = new MatTableDataSource(
      this.UserRoleAttachmentTable
    );
    this.tableAttachmentData.paginator = this.paginator;
    this.tableAttachmentData.sort = this.sort;
  }
  selectedAttachmentFileList: File[] = [];
  attachmentDtoList: any[] = [];
  onCreateSelectedAttachmentList() {
    this.selectedAttachmentFileList.push(this.selectedAttachmentFiles);
    this.UserRoleAttachmentTable.push({
      uc0001: null,
      attachmentName: this.UserRequirementForm.controls['attachmentName'].value,
      categoryTypes: 'AT',
      uploadedAttachmentfileName: this.uploadedAttachmentfileName,
      documentAction: 'CREATE',
    });
    this.attachmentDtoList.push({
      uc0001: null,
      ff0001: this.UserRequirementForm.controls['attachmentName'].value,
      ff0005: 'AT',
      ff0013: ' ',
      lc0002: ' ',
      lc0003: ' ',
      lc0004: ' ',
      // selectedAttachmentFileList: this.selectedAttachmentFiles,
      documentAction: 'CREATE',
      // ff0002:this.headerData.unitcode,
      // ff0003:this.headerData.departmentcode,
      // ff0004:this.headerData.modulecode,
      //ff0004:'URS',
      // ff0006:this.uploadedAttachmentfileName,
      //  ff0011:this.headerData.stage
    });
    console.log(this.UserRoleAttachmentTable);
    this.tableAttachmentData = new MatTableDataSource(
      this.UserRoleAttachmentTable
    );
    this.tableAttachmentData.paginator = this.paginator;
    this.tableAttachmentData.sort = this.sort;
  }
  removeRow(row: any) {
    const index = this.UserRoleTable.indexOf(row);
    if (index !== -1) {
      this.UserRoleTable.splice(index, 1);
    }
    this.documentDtoList = this.UserRoleTable;
    console.log(this.UserRoleTable);
    this.tableData = new MatTableDataSource(this.UserRoleTable);
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }
  documentDtoList: any[] = [];
  selectedFileList: File[] = [];
  onCreateSelectedDataList() {
    let mTypeValidation = true;
    if (this.isValidFileType == false) {
      console.log('invalid file');
    } else {
      if (this.UserRequirementForm.controls['categoryTypes'].value == 'M') {
        this.UserRoleTable.forEach((element: any) => {
          if (
            element.categoryTypes ==
            this.UserRequirementForm.controls['categoryTypes'].value
          ) {
            mTypeValidation = false;
            this.dialog.open(MessageDialogComponent, {
              data: {
                message: "Category type 'M' already available",
                heading: 'Error Information',
              },
            });
          }
        });
      } else {
        mTypeValidation = true;
      }
      if (mTypeValidation) {
        console.log(this.UserRequirementForm.controls['categoryTypes'].value);
        this.selectedFileList.push(this.selectedFiles);
        this.UserRoleTable.push({
          uc0001: null,
          selectedFileList: this.selectedFiles,
          //documentName:this.selectedDataList.documentName,
          documentName: this.UserRequirementForm.controls['documentName'].value,
          categoryTypes:
            this.UserRequirementForm.controls['categoryTypes'].value,
          // uploadedDocfileName:this.uploadedDocfileName,
          ff0001: this.UserRequirementForm.controls['documentName'].value,
          ff0005: this.UserRequirementForm.controls['categoryTypes'].value,
          documentAction: 'CREATE',
        });
        this.documentDtoList.push({
          uc0001: null,
          selectedFileList: this.selectedFiles,
          ff0001: this.UserRequirementForm.controls['documentName'].value,
          // ff0002:this.headerData.unitcode,
          // ff0003:this.headerData.departmentcode,
          //ff0004:this.headerData.modulecode,
          ff0005: this.UserRequirementForm.controls['categoryTypes'].value,
          // ff0006:this.uploadedDocfileName,
          // ff0011:this.headerData.stage
          documentAction: 'CREATE',
        });
        console.log(this.UserRoleTable);
        this.tableData = new MatTableDataSource(this.UserRoleTable);
        this.tableData.paginator = this.paginator;
        this.tableData.sort = this.sort;
      }
    }
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  headerData: any;
  getHeaderData(event: any) {
    console.log(event);
    if (event) {
      this.headerData = event;
      console.log(event);
      let uc0001 = this.headerData.unitcode;
      this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);

      this.cmService.cmInput(uc0001).subscribe(({ data }) => {
        console.log(data);
        this.psmList = data.pmsList;
      });
    }
  }

  deleteTodo(id: number) {
    this.selectedCourseList.splice(id, 1);
    this.selectedCourseList = [...this.selectedCourseList];
  }

  public addCourseList() {
    const dialogRef = this.dialog.open(PmsListComponent, {
      minWidth: '80%',
      data: this.psmList,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != true) {
        if (result.data.length > 0) {
          this.selectedCourseList = result.data;
        }
      }
    });

    // this.onLoadTopiList();
  }
  async onSaveConfirmation() {
    if (this.documentDtoList.length > 0) {
      const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
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
            this.onSubmit('0');
          }
        }
      });
    } else {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'please add document before procced.',
          heading: 'Error Information',
        },
      });
    }
  }
  selectedDialogData: any;
  async onSubmitConfirmation() {
    if (this.documentDtoList.length > 0) {
      const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
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
            this.onSubmit('1');
          }
        }
      });
    } else {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'please add document before procced.',
          heading: 'Error Information',
        },
      });
    }
  }
  onSubmit(value: any) {
    this.disableButtons = true;
    let draftValue: boolean;
    if (value == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }
    let attachement = [];
    let docNames = [];
    let categoryTypes = [];

    this.UserRoleTable.forEach((element) => {
      docNames.push(element.docNames);
      categoryTypes.push(element.categoryTypes);
      attachement.push(element.attachement);
    });
    let body = {
      ursDTO: {
        lcRequest: {
          unitCode: this.headerData.unitcode,
          moduleCode: this.headerData.modulecode,
          departmentCode: this.headerData.departmentcode,
          // "lcrqNumber": this.headerData.unitcode, //need to check
          lcNumber: this.headerData.lcnum,
          lcStage: this.headerData.stage,
          //"stage2":this.UserRequirementForm.controls['stage2'].value,
          stage2: 0,
          draft: draftValue,
          comments: this.comments,
          requestType: '',
          createdBy: this.cookieService.get('userId'),
          lcRole: this.headerData.role,
          documentModule: 'CM',
          documentStatus: '',
          gmuserDTOList: [],
        },
        documentDtoList: this.documentDtoList,
        //attachmentDtoList: this.attachmentDtoList,
        reqProductMasterDtoList: [
          {
            uc0001: null,
            unitcode: this.cookieService.get('buCode'),
            ff0001: this.pmsList.controls['productNo'].value,
            ff0002: this.HeaderForm.controls['productName'].value,
            ff0003: this.HeaderForm.controls['market'].value,
            ff0004: 0,
            ff0005: this.HeaderForm.controls['uom'].value,
            ff0006: 0,
            ff0007: this.HeaderForm.controls['productType'].value,
            ff0008: this.HeaderForm.controls['dosageForm'].value,
            ff0009: this.HeaderForm.controls['inputCode'].value,
            ff0010: this.HeaderForm.controls['productCode'].value,
            ff0011: this.HeaderForm.controls['productTrackingCode'].value,
            ff0012: this.HeaderForm.controls['shelfLifeMonths'].value,
            ff0013: '',
            ff0014: '',
            ff0015: '',
            ff0016: '',
            ff0017: '',
            ff0018: '',
            ff0019: '',
            bucode: this.cookieService.get('buCode'),
            createdby: 'string',
            status: 0,
            comments: 'string',
            lc0001: 'string',
            lc0003: 'string',
            lc0004: 'string',
            lc0002: 'string',
            lc0006: 'string',
            lc0005: 'string',
          },
        ],
        attachmentDtoList:
          this.attachmentDtoList.length === 0 ? null : this.attachmentDtoList,
      },
    };
    console.log(body);
    console.log(this.documentDtoList);
    let selectedFile: any[] = [];
    this.documentDtoList.forEach((elements: any) => {
      selectedFile.push(elements.selectedFileList);
    });
    let selectedAttachment: any[] = [];
    this.attachmentDtoList.forEach((elements: any) => {
      selectedAttachment.push(elements.selectedAttachmentFileList);
    });
    this.isLoading = true;
    this.cmService
      .cmOnCreate(selectedFile, selectedAttachment, body)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;

          this.notificationService.showSuccess(data.status, () => { });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.router.navigateByUrl('/rqpquailtyui/cm/cm-module-home-page');
            });
        }
      });
  }

  //******************************LOV IMPLEMENTATION *******************************************/
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };
    console.log(body);
    this.cmService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  displayedColumns: any;
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
        this.UserRequirementForm.controls['stage2'].setValue(result.data.stage);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
