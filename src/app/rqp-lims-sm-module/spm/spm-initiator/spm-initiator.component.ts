import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { SpmService } from '../spm.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { Subject, takeUntil, timer } from 'rxjs';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { PmsListComponent } from 'src/app/rqp-lims-module/pms-list/pms-list.component';

@Component({
  selector: 'app-spm-initiator',
  standalone: false,
  templateUrl: './spm-initiator.component.html',
  styleUrl: './spm-initiator.component.scss'
})
export class SpmInitiatorComponent implements OnInit {
  public SPMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public SPMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public comments: string;
  public nextStageListData: any;
  public headerRequestBody: any;
  public isLoading = false;
  destroy$ = new Subject<void>();
  public selectedFiles: any;
  public uploadedDocfileName: any;
  public selectedFileList: File[] = [];
  public isStatusSuccess = false;
  public selectedDialogData: any;
  public isSubjectCodeSuccess: boolean;
  public displayedColumns: any;
  public body1: any;
  public draftValue: boolean;
  public tableData: any;
  public pmmMaterialList: any[] = [];
  public psmList: any[] = [];
  public saleProductList: any[] = [];
  public spAttachmentList: any[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private spmService: SpmService,
    public fb: FormBuilder,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private route: Router,
    public buttonLabelService: ButtonLabelService,
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
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'spm-Initiator',
    };
    this.onloadDropDownList();

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
  onloadDropDownList() {
    this.isLoading = true;
    this.spmService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.pmmMaterialList = data.data.pmmMaterialList;
      this.saleProductList = data.data.saleProductList;
      this.isLoading = false;
    });
  }
  public onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };

    this.spmService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.spmService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
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
  onChangeSubject(index: number) {
    const productNumber = this.products.at(index).get('productNo');
    if (!productNumber.value) {
      productNumber.setValue('');
    } else {
      let statusCurrentValue = productNumber.value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        productNumber.setErrors({
          incorrect: true,
        });
        this.openStatusLOV(index);
      }
    }
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
        stage2: 0,
        requestType: '',
        createdBy: this.headerData.createdby,
        comments: this.comments,
        documentModule: 'string',
        documentStatus: 'string',
        gmuserDTOList: [],
        draft: this.draftValue,
      },

      descriptionList: products.map((element: any) => ({
        uc0001: null,
        unitcode: this.headerData.unitcode,
        ff0001: element.productNo,
        ff0002: "2026-05-05T09:14:56.862Z",
        ff0003: "2026-05-05T09:14:56.862Z",
        ff0004: "2026-05-05T09:14:56.862Z",
        ff0005: element.productName,
        ff0006: element.market,
        ff0007: element.productCode,
        ff0008: element.uom,
        ff0009: "2026-05-05T09:14:56.862Z",
        ff0010: "2026-05-05T09:14:56.862Z",
        ff0011: element.shelfLifeMonths,
        ff0012: element.productType,
        ff0013: element.dosageForm,
        ff0014: element.inputCode,
        ff0015: element.productTrackingCode,
        lc0001: "string",
        lc0002: "string",
        lc0003: "string",
        lc0004: 0,
        lc0005: "string",
        lc0006: "string",
        createdby: this.headerData.createdby,
        status: 0,
        // version: 0,
        comments: this.comments
      })),
      testList: containers.map((item: any) => ({
        uc0001: null,
        unitcode: this.headerData.unitcode,
        ff0001: item.materialNo,
        ff0002: item.materialName,
        ff0003: item.materialCode,
        ff0004: item.weight,
        ff0005: item.weightUom,
         ff0006: "string",
        ff0007: "string",
        ff0008: "string",
        ff0009: "string",
        ff0010: "string",
        lc0001: '',
        lc0002: '',
        lc0003: '',
        lc0004: '',
        lc0005: '',
        lc0006: '',
        createdby: this.headerData.createdby,
        status: 0,
        comments: this.comments,
      })),
      attachmentList: this.spAttachmentList,
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

