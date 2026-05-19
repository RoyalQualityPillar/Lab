import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SpmService } from '../spm.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil, timer } from 'rxjs';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSort } from '@angular/material/sort';
import { PmsListComponent } from 'src/app/rqp-lims-module/pms-list/pms-list.component';

@Component({
  selector: 'app-spm-update-save',
  standalone: false,
  templateUrl: './spm-update-save.component.html',
  styleUrl: './spm-update-save.component.scss'
})
export class SpmUpdateSaveComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public SPMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public SPMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public ff0005: number;
  public ff0001: any;
  public lc0001: any;
  public lc0003: any;
  public ff0002: any;
  dataSource: any;
  private comments: string;
  public reviewCommentsData: any;
  public tableData: any;
  public selectedDialogData: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public disableButtons = false;
  public userCurrentComments: any;
  public isLoading = false;
  public isStatusSuccess = false;
  public body1: any;
  public draftValue: boolean;
  public spAttachmentListTableData: any;
  public spmTestValue: any;
  public spmDescriptionValue: any;
  public selectedFiles: any;
  public uploadedDocfileName: any;
  public displayedColumns: any;
  public psmList: any[] = [];
  public pmmMaterialList: any[] = [];
  public saleProductList: any[] = [];
  public selectedFileList: File[] = [];
  destroy$ = new Subject<void>();
  public spAttachmentList: any[] = [];
  public spAttachmentListData: any[] = [];
  spAttachListdisplayedColumns: string[] = [
    'uc0001',
    'ff0007',
    'createdby',
    'createdon',
    'ff0005',
    'removeRow',
  ];
  constructor(
    public dialog: MatDialog,
    private spmService: SpmService,
    public fb: FormBuilder,
    private route: Router,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    private lifeCycleDataService: LifeCycleDataService,
    private shareHostDataService: ShareHostDataService,
    private remoteLoader: RemoteComponentLoaderService,
  ) {
    this.SPMRequirementForm = fb.group({
      products: fb.array([this.createProduct()])
    });
    this.ContainerRequirementForm = this.fb.group({
      containers: this.fb.array([this.createContainer()])
    });
    this.SPMAttachmentRequirementForm = this.fb.group({
      comments: [''],
      stage2: [''],
      attachmentName: [''],
      documentName: [''],
      categoryTypes: [''],
      attachmenentCategoryTypes: [''],
    });
  }
  ngOnInit(): void {
    this.pageData = {
      pageName: 'spm',
    };

    const updateData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (updateData) {
      params = JSON.parse(updateData);
      // this.ff0003 = params.ff0003;
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
      this.lc0001 = params.ff0001;
      this.ff0005 = params.ff0007;
      this.ff0002 = params.ff0005;
    }
    this.onloadDropDownList();
    if (this.ff0001) {
      this.getSPMRequestNo();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  createProduct(): FormGroup {
    return this.fb.group({
      productNo: [''],
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
  }
  get products(): FormArray {
    return this.SPMRequirementForm.get('products') as FormArray;
  }
  addProduct() {
    this.products.push(this.createProduct());
  }
  removeProduct(index: number) {
    this.products.removeAt(index);
  }
  createContainer(): FormGroup {
    return this.fb.group({
      materialNo: [''],
      materialName: [''],
      materialCode: [''],
      weight: [''],
      weightUom: ['']
    });
  }
  get containers(): FormArray {
    return this.ContainerRequirementForm.get('containers') as FormArray;
  }
  addContainer() {
    this.containers.push(this.createContainer());
  }
  removeContainer(index: number) {
    this.containers.removeAt(index);
  }
  removeRow(index: number) {
    // this.items.removeAt(index);
    this.spAttachmentList.splice(index, 1);
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.shareHostDataService.lcNumber,
      lcStage: this.shareHostDataService.currentStage
    };
    this.spmService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
      this.previousStageListData = data.data.pstage;
    });
  }
  onloadDropDownList() {
    this.isLoading = true;
    this.spmService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.pmmMaterialList = data.data.pmmMaterialList;
      this.saleProductList = data.data.saleProductList;
      this.isLoading = false;
    });
  }
  public getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.spmService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
    this.onReviewData();
  }
  onReviewData() {
    this.spmService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        this.dataSource.sort = this.sort;
      });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  handleFileInput(event: any) {
    this.selectedFiles = event.target.files[0];
    if (this.selectedFiles) {
      this.uploadedDocfileName = this.selectedFiles.name;
    }
  }
  filterEmptyObjects(objects: any[]): any[] {
    return objects.filter((obj) => Object.keys(obj).length > 0);
  }
  onCreateSelectedDataList() {
    this.selectedFileList.push(this.selectedFiles);
    // Check if the document name is provided before proceeding
    if (this.SPMAttachmentRequirementForm.controls['documentName'].value) {
      // Add new action attachment object
      this.spAttachmentList.push({
        uc0001: null,
        selectedFileList: this.selectedFiles,
        ff0001: this.SPMAttachmentRequirementForm.controls['documentName'].value,
        ff0005: 'AT',
        ff0013: "string",
        ff0015: "att",
        lc0002: "string",
        lc0003: "string",
        lc0004: "string",
        documentAction: 'CREATE',
        documnetType: "CREATE"
      });

      let filteredObjects = this.filterEmptyObjects(this.spAttachmentList);
      this.spAttachmentList = filteredObjects;
      // this.tableData = new MatTableDataSource(item.spAttachmentList);
      this.tableData = this.spAttachmentList;
    } else {
      console.log('Document name is empty, not adding spAttachmentList');
    }
  }
  getSPMRequestNo() {
    this.spmService.getResquestNoIDForSPM(this.ff0001, this.lc0001).subscribe((data: any) => {
      this.lc0003 = data.data[0].lc0003;
      if (this.lc0003) {
        this.getSPMTestList(this.lc0003);
        this.getSPMDescriptionList(this.lc0003);
        this.getSPMAttachments(this.lc0003);
      }
    });
  }
  getSPMAttachments(lc0003: any) {
    this.spmService.getSPMAttachments(lc0003, this.ff0002).subscribe((data: any) => {
      if (data.data) {
        data.data.forEach((element: any) => {
          if (
            element.documentAction == null ||
            element.documentAction == '' ||
            element.documentAction == undefined
          ) {
            element.documentAction = 'IGNORE';
          } else {
            element.documentAction = element.documentAction;
          }
        });
      }
      this.spAttachmentListData = data.data;
      this.spAttachmentListTableData = new MatTableDataSource(data.data);
    });
  }
  getSPMTestList(lc0003: any) {
    this.spmService.getSPMTestList(lc0003).subscribe((data: any) => {
      this.spmTestValue = data.data;
      this.containers.clear();
      const value = this.spmTestValue[0];
      this.spmTestValue.forEach((pack: any) => {
        const container = this.createContainer();
        container.patchValue({
          materialNo: pack.ff0001,
          materialName: pack.ff0002,
          materialCode: pack.ff0003,
          weight: pack.ff0004,
          weightUom: pack.ff0005,
        });
        this.containers.push(container);
      });

    });
  }
  getSPMDescriptionList(lc0003: any) {
    this.spmService.getSPMDescriptionList(lc0003).subscribe((data: any) => {
      this.spmDescriptionValue = data.data;
      this.products.clear();
      this.spmDescriptionValue.forEach((element: any) => {
        const product = this.createProduct();
        product.patchValue({
          productNo: element.ff0001,
          productName: element.ff0005,
          market: element.ff0006,
          productCode: element.ff0007,
          uom: element.ff0008,
          shelfLifeMonths: element.ff0011,
          productType: element.ff0012,
          dosageForm: element.ff0013,
          inputCode: element.ff0014,
          productTrackingCode: element.ff0015,
        });
        this.products.push(product);
      });
    });
  }
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
          this.Submit('0');
        }
      }
    });
  }
  async onSubmitConfirmation(btnStatus: any) {
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
          this.Submit('1');
        }
      }
    });
  }
  formatRequestBody() {
    const products = this.products.value;
    const containers = this.containers.value;
    this.body1 = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        lcRole: this.headerData.role,
        lcrqNumber: this.pageData?.requestNo,
        stage2: 0,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },

      descriptionList: this.spmDescriptionValue.map((element: any) => ({
        uc0001: element.uc0001,
        unitcode: this.headerData.unitcode,
        ff0001: element.ff0001,
        ff0002: "2026-05-05T09:14:56.862Z",
        ff0003: "2026-05-05T09:14:56.862Z",
        ff0004: "2026-05-05T09:14:56.862Z",
        ff0005: element.ff0005,
        ff0006: element.ff0006,
        ff0007: element.ff0007,
        ff0008: element.ff0008,
        ff0009: "2026-05-05T09:14:56.862Z",
        ff0010: "2026-05-05T09:14:56.862Z",
        ff0011: element.ff0011,
        ff0012: element.ff0012,
        ff0013: element.ff0013,
        ff0014: element.ff0014,
        ff0015: element.ff0015,
        lc0001: element.lc0001,
        lc0002: element.lc0002,
        lc0003: element.lc0003,
        lc0004: 0,
        lc0005: element.lc0005,
        lc0006: element.lc0006,
        createdby: element.createdby,
        status: element.status,
        // version: 0,
        comments: this.comments
      })),
      testList: this.spmTestValue.map((item: any) => ({
        uc0001: item.uc0001,
        unitcode: this.headerData.unitcode,
        ff0001: item.ff0001,
        ff0002: item.ff0002,
        ff0003: item.ff0003,
        ff0004: item.ff0004,
        ff0005: item.ff0005,
        ff0006: "string",
        ff0007: item.ff0007,
        ff0008: item.ff0008,
        ff0009: item.ff0009,
        ff0010: item.ff0010,
        lc0001: item.lc0001,
        lc0002: item.lc0002,
        lc0003: item.lc0003,
        lc0004: item.lc0004,
        lc0005: item.lc0005,
        lc0006: item.lc0006,
        createdby: item.createdby,
        status: item.status,
        comments: this.comments,
      })),
      attachmentList: this.spAttachmentListData
    };

  }
  Submit(btnStatus: any) {
    if (btnStatus == 1) {
      this.draftValue = false;
    } else {
      this.draftValue = true;
    }
    this.isLoading = true;
    let bodyData = this.formatRequestBody();
    let attachmentList: any[] = [];
    this.body1.attachmentList.forEach((obj) => {
      console.log(obj.selectedFileList);
      if (obj.selectedFileList) {
        attachmentList.push(obj.selectedFileList);
      }
    });
    this.spmService
      .onSPMSaveUpdate(attachmentList, this.body1)
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;
          this.notificationService.showSuccess(data.status, () => {
          });
          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.route.navigateByUrl('/rqplabui/lims/spm-module-admin');
            });
        }
      });
  }
  downloadDocument(row) {
    let fileExtension = getFileExtension(row.ff0013);
    this.spmService
      .onDownloadDocumet(row.uc0001)
      .subscribe((data: any) => {
        const binaryData = atob(data.data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        let blob: any;
        if (fileExtension == 'pdf' || fileExtension == 'PDF') {
          blob = new Blob([uint8Array], { type: 'application/pdf' });
        } else {
          blob = new Blob([uint8Array], { type: 'application/msword' });
        }
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = row.uc0001 + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  }
  openStatusLOV(index: number) {
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
        this.products.at(index).patchValue({
          productNo: this.selectedDialogData.productNO
        });

        this.spmService
          .productList(this.selectedDialogData.productNO)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.products.at(index).patchValue({
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
  openMaterialListLOV(index: number) {
    this.displayedColumns = [
      { field: 'materialnumber', title: 'Material Number' },
      { field: 'materialcode', title: 'Material Code' },
      { field: 'materialname', title: 'Material Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Sales Product List',
        dialogColumns: this.displayedColumns,
        dialogData: this.pmmMaterialList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.containers.at(index).patchValue({
          materialNo: this.selectedDialogData.materialnumber,
          materialName: this.selectedDialogData.materialname,
          materialCode: this.selectedDialogData.materialcode
        });
      }
    });
  }
  onChangeByMaterialCode(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialCode.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialCode.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialNo(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialNo.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialNo.value;
      this.saleProductList.forEach((elements) => {
        if (elements.punumber == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialName(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialName.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialName.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitname == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
}
