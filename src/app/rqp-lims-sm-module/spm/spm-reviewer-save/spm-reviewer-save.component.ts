import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { SpmService } from '../spm.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spm-reviewer-save',
  standalone: false,
  templateUrl: './spm-reviewer-save.component.html',
  styleUrl: './spm-reviewer-save.component.scss'
})
export class SpmReviewerSaveComponent implements OnInit {
  public redirectUrl: string = '/rqplabui/lims/spm-module-admin';
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
  public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
  public disableButtons = false;
  public userCurrentComments: any;
  public isLoading = false;
  public spAttachmentListTableData: any;
  public spmTestValue: any;
  public spmDescriptionValue: any;
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
    private spmService: SpmService,
    public fb: FormBuilder,
    private lifeCycleDataService: LifeCycleDataService,
    private shareHostDataService: ShareHostDataService,
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
    };
    const reviewData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (reviewData) {
      params = JSON.parse(reviewData);
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
  public getHeaderData(event: any) {
    this.headerData = event;
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
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
  buttonConfig = [
    { label: 'Return', getPayload: () => this.calculateReturnPayload() },
    { label: 'Submit', getPayload: () => this.calculateReturnPayload() },
    // { label: 'Clear', getPayload: () => this.calculateReturnPayload() },
    { label: 'Comments', getPayload: () => this.calculateCommentsPayload() },
  ];
  calculateReturnPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      requestFieldData: 'specific',
      commentsFieldData: this.userCurrentComments,
      pageData: this.pageData,
      // list: this.list,
    };
  }

  calculateCommentsPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      lcRequestnumber: this.headerData.requestNo,
      lcnum: this.headerData.lcnum,
      templateName: 'ch.html',
      stage: this.headerData.stage,
      userid: this.headerData.createdby,
      moduleCode: this.headerData.modulecode,
    };
  }
  onButtonClicked(event: { buttonName: string; success: boolean }) {
    console.log('Button: ${event.buttonName}, Success: ${event.success}');
    this.disableButtons = true;
    if (event.success && event.buttonName == 'Return') {
    }
    if (event.success && event.buttonName == 'Submit') {
    }
    if (event.success && event.buttonName == 'Comments') {
    }
    // if (event.success && event.buttonName == 'Clear') {
    // }
  }
}

