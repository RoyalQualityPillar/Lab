import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SpmService } from '../spm.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { getFileExtension } from 'src/app/common/removeEmptyStrings';

@Component({
  selector: 'app-spm-completed-save',
  standalone: false,
  templateUrl: './spm-completed-save.component.html',
  styleUrl: './spm-completed-save.component.scss'
})
export class SpmCompletedSaveComponent implements OnInit {
    public SPMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
  public SPMAttachmentRequirementForm: FormGroup;
  public headerData: any;
  public pageData: any;
   public ff0005: number;
  public ff0001: any;
    public ff0002: any;
  public ff0003: any;
    public lc0003: any;
      public lc0001: any;
        public userCurrentComments: any;
    public nextStageListData: any;
  public headerRequestBody: any;
  public previousStageListData: any;
   public spAttachmentListTableData: any;
  public spmTestValue: any;
  public spmDescriptionValue: any;
    public isLoading = false;
   commentType = 'completedRecord';
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
){
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
   const reviewData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (reviewData) {
      params = JSON.parse(reviewData);
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
      this.ff0005 = params.ff0008;
        this.ff0002 = params.ff0005;
         this.lc0001 = params.ff0001;
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

       public downloadSPMReport() {
    // const lcNumber = this.headerData?.lcnum;
    // const templateName = 'cc.html';
    // const moduleCode = this.headerData?.modulecode;
    // const ccno = this.headerData.requestNo;
    // const lcrnumber = this.headerData.requestNo;
    // this.isLoading = true;
    // this.qmsService
    //   .downloadSPMReport(
    //     lcNumber,
    //     templateName,
    //     ccno,
    //     moduleCode,
    //     lcrnumber
    //   )
    //   .subscribe((data: any) => {
    //     let fileExtension = 'pdf';
    //     const binaryData = atob(data.data);
    //     const arrayBuffer = new ArrayBuffer(binaryData.length);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < binaryData.length; i++) {
    //       uint8Array[i] = binaryData.charCodeAt(i);
    //     }
    //     let blob: any;
    //     blob = new Blob([uint8Array], { type: 'application/pdf' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = ccno + '.' + fileExtension;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   });
    // this.isLoading = false;
  }
   public downloadSPMAttachedReport() {
    // const lcNumber = this.headerData?.lcnum;
    // const templateName = 'cc.html';
    // const moduleCode = this.headerData?.modulecode;
    // const lcrnumber = this.headerData.requestNo;
    // this.isLoading = true;
    // this.qmsService
    //   .downloadSPMAttachedReport(
    //     lcNumber,
    //     templateName,
    //     moduleCode,
    //     lcrnumber
    //   )
    //   .subscribe((data: any) => {
    //     let fileExtension = 'pdf';
    //     const binaryData = atob(data.data);
    //     const arrayBuffer = new ArrayBuffer(binaryData.length);
    //     const uint8Array = new Uint8Array(arrayBuffer);
    //     for (let i = 0; i < binaryData.length; i++) {
    //       uint8Array[i] = binaryData.charCodeAt(i);
    //     }
    //     let blob: any;
    //     blob = new Blob([uint8Array], { type: 'application/pdf' });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = lcrnumber + '.' + fileExtension;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     window.URL.revokeObjectURL(url);
    //   });
    // this.isLoading = false;
  }

   getComments() {
    const lcRequestnumber = this.headerData.requestNo;
    const lcnum = this.headerData.lcnum;
    const templateName = 'ch.html';
    const stage = 1;
    const userid = this.headerData.createdby;
    const moduleCode = this.headerData.modulecode;
    this.spmService
      .onGetCommentsData(
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
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
        link.download = lcRequestnumber + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
      
}
