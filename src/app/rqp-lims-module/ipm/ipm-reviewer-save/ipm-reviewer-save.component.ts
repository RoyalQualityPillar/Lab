import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Subject, timer, takeUntil } from 'rxjs';
import { CommonFileUploadComponent } from 'src/app/common/common-file-upload/common-file-upload.component';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';
import { DmsService } from 'src/app/service/dms.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { MessageService } from 'src/app/service/message.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { PreviewFileComponent } from 'src/app/toolbar/preview-file/preview-file.component';
import { LimsService } from '../../lims.service';
import { IpmReviewerComponent } from '../ipm-reviewer/ipm-reviewer.component';

@Component({
  selector: 'app-ipm-reviewer-save',
  standalone: false,
  templateUrl: './ipm-reviewer-save.component.html',
  styleUrl: './ipm-reviewer-save.component.scss'
})
export class IpmReviewerSaveComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  EventForm: FormGroup;
  isReadonly = true;
  UserRequirementForm: FormGroup;
  CCRequirementForm: FormGroup;
  FooterForm: FormGroup;
  isLoading = false;
  pageData: any;
  sList: any;
  oList: any;
  dList: any;
  lcMasterList: any;
  itemCategoryList: any;
  icsMasterList: any;
  rctMasterList: any;
  private ff0005: number;
  ctMasterList: any;
  actionDtoList: any = [{}];
  nextStageListData: any;
  headerRequestBody: any;
  previousStageListData: any;
  ff0003: any;
  ff0001: any;
  lc0003: any;
  module: any;
  private comments: string;
  moduleCode: any;
  documentListData: any;
  reviewCommentsData: any;
  commentsDataSource: any;
  dataSource: any;
  copiedData: any;
  tableData: any;
  dataSourceActionItem: any;
  tableDataActionItem: any;
  documentListTableData: any;
  lineItemData: any;
  issueDetailData: any;
  fileType: any;
  url: any;
  headerData: any;
  displayedColumns: any;
  selectedDialogData: any;
  createUpdateDocumentList: any;
  selectedFiles: any;
  selectedFilesAttachment: any;
  uploadedDocfileName: any;
  body1: any;
  draftValue: any;
  UserRoleTableAttachment: any;
  isRiskFlag = false;
  mediumRisk = false;
  noRisk = false;
  actionTypeList: any;
  destroy$ = new Subject<void>();
  isStatusSuccess: boolean;
  selectedFileList: File[] = [];
  displayedEventColumns: string[] = ['action', 'uc0001', 'ff0001', 'ff0002'];
  displayedActionColumns: string[] = [
    'ff0001',
    'ff0002',
    'ff0014',
    'ff0003',
    'ff0013',
    'ff0004',
    'ff0015',
  ];
  commentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'comments',
  ];
  documentListdisplayedColumns: string[] = [
    'uc0001',
    'ff0007',
    'version',
    'createdby',
    'createdon',
    'ff0005',
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
    private dmsService: DmsService,
    private route: Router,
    private remoteLoader: RemoteComponentLoaderService
  ) {
    this.UserRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
    });
    this.FooterForm = this.fb.group({
      nextStage: [''],
      previousStage: [''],
    });
    this.EventForm = this.fb.group({
      ff0001: [''],
      ff0002: [''],
      ff0003: [''],
      ff0004: [''],
      ff0005: [''],
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
      pageName: 'qms',
    };

    this.router.queryParams.subscribe((params: any) => {
      console.log(params);
      this.ff0003 = params.ff0003;
      this.pageData = {
        pageName: 'qtUpdateDetail',
        requestNo: params.uc0001,
        version:
          params.ff0007 +
          '.' +
          params.ff0008 +
          '.' +
          params.ff0009 +
          '.' +
          params.ff0010,
      };
      this.ff0001 = params.uc0001;
      this.ff0005 = params.ff0007;
      console.log(this.pageData);
    });
    if (this.ff0001) {
      this.onGetQMSRequestNo();
      this.onGetCCRequestNo();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();

    // this.onLoadNextStageData();
    // this.headerRequestBody=this.lifeCycleDataService.getSelectedRowData();
    // console.log(this.headerRequestBody.lifeCycleCode)
    // if(this.headerRequestBody.lifeCycleCode){
    //   this.onLoadEventClassification(this.headerRequestBody.lifeCycleCode)
    // }
  }
  ngAfterViewInit(): void {}

  onReviewData() {
    this.limsService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        this.dataSource.sort = this.sort;
      });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
    console.log(event);
  }
  onLoadEventClassification(lc0003: any) {
    this.limsService.getEventClassification(lc0003).subscribe((data: any) => {
      console.log(data);
      this.dataSource = data.data[0];
      this.EventForm.controls['ff0001'].setValue(this.dataSource.ff0001);
      this.EventForm.controls['ff0002'].setValue(this.dataSource.ff0002);
      this.EventForm.controls['ff0003'].setValue(this.dataSource.ff0003);
      this.EventForm.controls['ff0004'].setValue(this.dataSource.ff0004);
      this.EventForm.controls['ff0005'].setValue(this.dataSource.ff0005);
      // this.copiedData = JSON.stringify(this.dataSource);
      // this.tableData = new MatTableDataSource(this.dataSource);
    });
  }

  getLoadActionItem(lc0003: any) {
    this.limsService.getEventActionItem(lc0003).subscribe((response: any) => {
      if (response && response.data && response.data.actionDtoList) {
        if (response.data.actionDtoList) {
          response.data.actionDtoList.forEach((item: any) => {
            if (item.actionAttachmentList)
              item.actionAttachmentList.forEach((element: any) => {
                if (element.documentAction == null) {
                  element.documentAction = 'IGNORE';
                }
              });
          });
        }
        this.actionDtoList = response.data.actionDtoList;
        console.log(this.actionDtoList);

        console.log(this.actionDtoList);
      } else {
        this.actionDtoList = []; // Ensure it's an array if no data is returned
      }
    });
  }

  lineItemHeading(lc0003: any) {
    this.limsService.getCCLineItemHeader(lc0003).subscribe((data: any) => {
      console.log(data);
      this.lineItemData = data.data;
    });
  }

  IssueDetails(lc0003: any) {
    this.limsService.getCCIssueDetails(lc0003).subscribe((data: any) => {
      console.log(data);
      this.issueDetailData = data.data[0];
      this.UserRequirementForm.controls['ff0001'].setValue(
        this.issueDetailData.ff0001
      );
      console.log(this.issueDetailData.ff0002);
      let ff0002Data = moment(
        this.issueDetailData.ff0002,
        'DD-MM-YYYY HH:mm:ss.SSS'
      ).toISOString();
      this.UserRequirementForm.controls['ff0002'].setValue(ff0002Data);
      console.log(this.UserRequirementForm.controls['ff0002'].value);
      let ff0003Data = moment(
        this.issueDetailData.ff0003,
        'DD-MM-YYYY HH:mm:ss.SSS'
      ).toISOString();
      this.UserRequirementForm.controls['ff0003'].setValue(ff0003Data);
    });
  }

  getDocumentList() {
    let moduleCode = 'CC';
    this.limsService
      .documentList(this.lc0003, moduleCode)
      .subscribe((data: any) => {
        console.log(data);
        if (data.data) {
          data.data.forEach((element: any) => {
            if (
              element.documentAction == null ||
              element.documentAction == '' ||
              element.documentAction == undefined
            ) {
              element.documentAction = 'IGNORE';
            }
          });
        }
        this.documentListData = data.data;
        // if (data.data.length > 0) {
        //   this.documentListData = true;
        // } else {
        //   this.documentListData = false;
        // }
        this.documentListTableData = new MatTableDataSource(data.data);
        // this.documentListTableData.paginator = this.paginator;
        // this.documentListTableData.sort = this.sort;
      });
  }
  getVersion(row) {
    const { ff0009, ff0010, ff0011, ff0012 } = row;
    return [ff0009, ff0010, ff0011, ff0012].some(
      (value) => value === undefined || value === null
    )
      ? ''
      : `${ff0009}.${ff0010}.${ff0011}.${ff0012}`;
  }

  downloadDocument(row) {
    let fileExtension = getFileExtension(row.ff0013);
    this.dmsService
      .getDocumet('ACTIVE', row.uc0001, row.lc0002, row.lc0001)
      .subscribe((data: any) => {
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
        console.log(fileExtension);
        if (fileExtension == 'pdf' || fileExtension == 'PDF') {
          blob = new Blob([uint8Array], { type: 'application/pdf' });
        } else {
          blob = new Blob([uint8Array], { type: 'application/msword' });
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'urs-document.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  }
  previewDocument(row, type) {
    console.log(row);
    console.log(type);
    let fileExtension;
    let selectedFile;
    if (type == 'document') {
      fileExtension = this.fileExtension(row.ff0014);
      selectedFile = row.ff0014;
    } else {
      fileExtension = this.fileExtension(row.ff0013);
      selectedFile = row.ff0013;
    }
    this.fileType = fileExtension;
    this.dmsService
      //.getDocumetPreview(row.documentNo, row.lc0002, row.lc0001)
      .getDocumetPreview('ACTIVE', row.uc0001, row.lc0002, row.lc0001)
      .subscribe((data: any) => {
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;

        console.log(fileExtension);
        if (fileExtension === 'pdf' || fileExtension === 'PDF') {
          blob = new Blob([uint8Array], { type: 'application/pdf' });
          this.url = window.URL.createObjectURL(blob);
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
          blob = new Blob([uint8Array], { type: 'image/png' });
          this.url = URL.createObjectURL(blob);
        }

        // Open the document content in a dialog
        this.openPreviewDialog(this.url);
      });
  }
  openPreviewDialog(url) {
    const dialogRef = this.dialog.open(PreviewFileComponent, {
      minWidth: '80%',
      minHeight: '60%',
      data: { tableData: url, type: this.fileType, showIframe: false },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  fileExtension(path: any) {
    const parts = path.split('.');
    const fileExtension = parts[parts.length - 1];
    return fileExtension;
  }
  onGetRequestNo() {
    console.log('Bharat');

    this.limsService
      .getResquestNoIDForURS(this.ff0001)
      .subscribe((data: any) => {
        console.log(data);
        this.lc0003 = data.data[0].lc0003;
        if (this.lc0003) {
          this.onLoadEventClassification(this.lc0003);
          // this.getLoadActionItem(this.lc0003);
          this.lineItemHeading(this.lc0003);
          this.IssueDetails(this.lc0003);
          this.getDocumentList();
        }
      });
  }
  onGetQMSRequestNo() {
    console.log('Bharat');
    this.limsService
      .getResquestNoIDForQMS(this.ff0001)
      .subscribe((data: any) => {
        console.log(data);
        this.lc0003 = data.data[0].lc0003;
        if (this.lc0003) {
          // this.onLoadEventClassification(this.lc0003);
          this.getLoadActionItem(this.lc0003);
          //  this.lineItemHeading(this.lc0003);
          // this.IssueDetails(this.lc0003);
          // this.getDocumentList();
        }
      });
  }
  onGetCCRequestNo() {
    console.log('Bharat');
    this.limsService.getResquestNoIDForCC(this.ff0001).subscribe((data: any) => {
      console.log(data);
      this.lc0003 = data.data[0].lc0003;
      if (this.lc0003) {
        this.onLoadEventClassification(this.lc0003);
        // this.getLoadActionItem(this.lc0003);
        this.lineItemHeading(this.lc0003);
        this.IssueDetails(this.lc0003);
        this.getDocumentList();
      }
    });
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };
    this.limsService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
      console.log(this.nextStageListData);
    });
  }

  getHeaderData(event: any) {
    console.log(event);
    this.headerData = event;
    this.onReviewData();
    if (this.headerData) {
      this.onLoadInputApi();
      //this.getDocumentList();
    }
  }
  addLineItem(item: any): void {
    item.ccLineDesDTOList.push({
      value4: '',
      value5: '',
    });
    console.log(this.ccLineItemIndexDTOList);
  }
  addNewRow() {
    this.lineItemData.push({
      ccLineItemIndexDTOList: [
        {
          ff0001: '',
          ff0002: '',
          ff0003: '',
          ff0004: '',
          ccLineDesDTOList: [{}],
        },
      ],
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
  addRemoveRow() {}
  removeRow(lineIndex: number, itemIndex: number) {
    this.lineItemData[lineIndex].ccLineItemIndexDTOList.splice(itemIndex, 1);
    if (this.lineItemData[lineIndex].ccLineItemIndexDTOList.length === 0) {
      this.lineItemData.splice(lineIndex, 1);
    }
  }
  /********************************LOV LIST ***************************************** */

  /********************************************************************** */

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
        this.FooterForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }

  ///////////////////////comments section
  onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
  }

  openPreviousStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Previous Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.previousStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.FooterForm.controls['previousStage'].setValue(result.data.stage);
      }
    });
  }

  onCallSubmitApi() {
    console.log(this.headerData);
    let body = {
      lcNumber: this.headerData?.lcnum,
      lcrqNumber: this.pageData?.requestNo,
      lcStage: this.headerData?.stage,
      lcRole: this.headerData?.role,
      stage2: this.FooterForm.controls['nextStage']?.value,
      createdBy: this.headerData?.createdby,
      comments: this.UserRequirementForm.controls['comments'].value,
    };
    if (body.stage2 == '' || body.stage2 == undefined) {
      body.stage2 = 0;
    }

    this.dmsService.onApproval(body).subscribe((data: any) => {
      if (data.errorInfo != null) {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: data.errorInfo.message,
            heading: 'Error Information',
          },
        });
      } else {
        this.messageService.sendSnackbar(
          'success',
          'Record inserted successfully'
        );
      }
      this.isLoading = false;
    });
  }
  eventSelectedRow(row) {
    const dialogRef = this.dialog.open(IpmReviewerComponent, {
      data: { type: 'event', tableData: row },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
      }
    });
  }

  /************************************************************************************ */

  addNewDocumentDetailRow(title: any) {
    const dialogRef = this.dialog.open(CommonFileUploadComponent, {
      height: '300px',
      width: '600px',
      data: {
        title: title,
        type: 'newDoc',
        isUpdate: false,
        UserRoleTable: this.documentListTableData,
        documentDtoList: this.documentListData,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createUpdateDocumentList = result;
        if (this.createUpdateDocumentList.result) {
          this.documentListData = this.createUpdateDocumentList.result;
          console.log(this.documentListData);
          this.documentListTableData = new MatTableDataSource(
            this.documentListData
          );
        }
        console.log(this.createUpdateDocumentList);
      }
    });
  }
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
      comments: '',
      actionAttachmentList: [],
    });
  }
  onRemoveActionItemRow(row: any) {
    const index = this.actionDtoList.indexOf(row);
    if (index !== -1) {
      this.actionDtoList.splice(index, 1);
    }
  }

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

  onCreateSelectedDataList(item) {
    // Ensure actionAttachmentList is properly initialized
    // if (!item.actionAttachmentList) {
    //////////// item.actionAttachmentList = [{}];
    //}
    console.log(item.actionAttachmentList);
    // Check if the document name is provided before proceeding
    if (this.CCRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      item.actionAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        documentName: this.CCRequirementForm.controls['documentName'].value,
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
  async onSaveConfirmation(btnStatus: any) {
    console.log(this.lineItemData);
    console.log(this.documentListData);
    console.log(this.actionDtoList);
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
  async onSaveUpdate(btnStatus: any) {
    console.log(this.actionDtoList);
    console.log(this.ccLineItemIndexDTOList);
    if (
      this.FooterForm.controls['nextStage'].value == '' ||
      this.FooterForm.controls['nextStage'].value == undefined
    ) {
      this.FooterForm.controls['nextStage'].setValue(0);
    }

    if (btnStatus == 1) {
      this.draftValue = false;
    } else {
      this.draftValue = true;
    }

    this.isLoading = true;
    let actionAttachmentList: any[] = [];
    let bodyData = await this.formatRequestBody();
    console.log(this.body1);
    //this.body1.actionDtoList.
    console.log(this.body1.actionDtoList);

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
    this.body1.actionDtoList.forEach((obj) => {
      const actionAttachmentList = obj.actionAttachmentList || [];
      const currentRowAttachments = [];
      actionAttachmentList.forEach((attachment) => {
        if (attachment.selectedFileList) {
          currentRowAttachments.push(attachment.selectedFileList);
        }
      });
      if (currentRowAttachments) {
        rowWiseActionAttachmentList.push(currentRowAttachments);
      }
    });
    console.log(rowWiseActionAttachmentList);

    console.log(actionAttachmentList);
    let attachmentList: any[] = [];
    console.log(this.body1.ccAttachmentList);
    if (this.body1.ccAttachmentList) {
      this.body1.ccAttachmentList.forEach((obj) => {
        console.log(obj.selectedFileList);
        if (obj.selectedFileList) {
          attachmentList.push(obj.selectedFileList);
        }
      });
    }
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

  formatRequestBody() {
    console.log(this.ccLineItemIndexDTOList);
    let startDate1 = moment(
      this.UserRequirementForm.controls['ff0002'].value
    ).format('DD-MM-YYYY HH:mm:ss.SSS');
    let endDate1 = moment(
      this.UserRequirementForm.controls['ff0003'].value
    ).format('DD-MM-YYYY HH:mm:ss.SSS');
    const startDate = moment(startDate1, 'DD-MM-YYYY HH:mm:ss.SSS')
      .utc() // Convert to UTC
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endDate = moment(endDate1, 'DD-MM-YYYY HH:mm:ss.SSS')
      .utc() // Convert to UTC
      .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    this.body1 = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        lcrqNumber: this.pageData?.requestNo,
        stage2: this.FooterForm.controls['nextStage'].value,
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
          uc0001: this.dataSource.uc0001,
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
          comments: 'string',
        },
      ],
      ccCommonDataDtoList: [
        {
          uc0001: this.dataSource.uc0001,
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
          lc0001: 'string',
          lc0002: 'string',
          lc0003: 'string',
          lc0004: 0,
          lc0005: 'string',
          lc0006: 'string',
          createdby: 'string',
          status: 0,
          comments: 'string',
        },
      ],
      ccLineItemDtoList: this.lineItemData,
      // "ccLineItemDtoList": [
      //   {
      //     "ccLineItemIndexDTOList": [...this.lineItemData],
      //     "ff0008": "string",
      //     "ff0009": "string",
      //     "ff0010": "string",
      //     "lc0001": "string",
      //     "lc0002": "string",
      //     "lc0003": "string",
      //     "lc0004": "string",
      //     "lc0005": "string",
      //     "lc0006": "string",
      //     "createdby": "string",
      //     "status": 0,
      //     "comments": "string"
      //   }
      // ],
      // attachmentDtoList: [
      //   {
      //     uc0001: this.dataSource.uc0001,
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
      //     comments: 'string',
      //   },
      // ],

      // "ccAttachmentList": [...this.UserRoleTableAttachment]
      ccAttachmentList: [...this.documentListData],
    };
    console.log(this.actionDtoList);
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
    console.log(this.actionDtoList);
    console.log(this.body1.ccLineItemDtoList);
    console.log(this.body1.ccLineItemDtoList[0].ccLineItemIndexDTOList);
    console.log(this.body1);
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
}


