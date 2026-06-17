import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WslrService } from '../wslr.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-wslr-completed-save',
  standalone: false,
  templateUrl: './wslr-completed-save.component.html',
  styleUrl: './wslr-completed-save.component.scss'
})
export class WslrCompletedSaveComponent implements OnInit {
  public workingStandardRegistrationForm: FormGroup;
  public commentType = 'completedRecord';
  public pageData: any;
  public headerData: any;
  public userCurrentComments: any;
  public headerRequestBody: any;
  public nextStageListData: any;
  public isLoading: boolean;
  public disableButtons = false;
  public lc0003: any;
  public ff0001: any;
  public lc0001: any;
  public ff0005: number;
  public ff0002: any;
  public WslcrRecordList: any;
  public WslcurRecordList: any;
  public WslprRecordList: any;
  public purityDetails: any[] = [{
    // purityCode: '',
    // wSLotNumber: '',
    purityType: '',
    purityValue: '',
     noOfPuritiesUOM: ''
  }]
  public containerDetails: any[] = [{
    // containerCode: '',
    // wSLotNumber: '',
    containerQty: '',
    valueUOM: '',
    // lotValidUpTo: '',
    // containerValidUpTo: '',
    // availableQty: ''
  }]
  constructor(
    public dialog: MatDialog,
    private wslrService: WslrService,
    private toolbarService: ToolbarService,
    public cookieService: CookieService,
    public fb: FormBuilder,
    private lifeCycleDataService: LifeCycleDataService,
    private remoteLoader: RemoteComponentLoaderService,
    private notificationService: NotificationService,
    private route: Router,
  ) {
    this.workingStandardRegistrationForm = fb.group({
      // wSLotNo: [''],
       productNo: [''],
       productName: [''],
        productCode: [''],
      lotTypes: [''],
      sampleRefNumber: [''],
      containerType: [''],
      storageCondition: [''],
      lotQuantity: [''],
      lotQuantityUOM: [''],
      manufactureDate: [''],
      expiryDate: [''],
      batchNumber: [''],
      sourceBatchNo: [''],
      wSValidityOn: [''],
      lotValidityUpTo: [''],
      // usageType: [''],
      noOfPurities: [''],
      // noOfPuritiesUOM: [''],
      containerValidityDays: [''],
      // containerStartingNumber: [''],
      noOfContainer: [''],
      alertContainerNumber: [''],
      totalContainerQty: [''],
      // totalContainerUOM: [''],
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
      this.getResquestNoIDForIWSLR();
    }
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  getHeaderData(event: any) {
    this.headerData = event;
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
  }
  onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      lcStage: this.toolbarService.currentStage,
    };
    this.wslrService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
 formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    return moment(dateString, 'DD-MM-YYYY HH:mm:ss.SSS').format('DD-MM-YYYY');
  }
  getResquestNoIDForIWSLR() {
    this.wslrService.getResquestNoIDForIWSLR(this.ff0001, this.lc0001).subscribe((data: any) => {
      console.log(data);
      this.lc0003 = data.data[0].lc0003;
      if (this.lc0003) {
        this.getWslcrRecordList(this.lc0003);
        this.getWslcurRecordList(this.lc0003);
        this.getWslprRecordList(this.lc0003);
      }
    });
  }
  getWslcrRecordList(lc0003: any) {
    this.wslrService.getWslcrRecordList(lc0003).subscribe((data: any) => {
      this.WslcrRecordList = data.data[0];
      this.workingStandardRegistrationForm.patchValue({
        // wSLotNo: this.WslcrRecordList.ff0001,
         productNo: this.WslcrRecordList.ff0001,
        productCode: this.WslcrRecordList.ff0002,
        productName: this.WslcrRecordList.ff0015,
        lotTypes: this.WslcrRecordList.ff0003,
        sampleRefNumber: this.WslcrRecordList.ff0004,
        containerType: this.WslcrRecordList.ff0005,
        storageCondition: this.WslcrRecordList.ff0006,
        lotQuantity: this.WslcrRecordList.ff0007,
        lotQuantityUOM: this.WslcrRecordList.ff0008,
        batchNumber: this.WslcrRecordList.ff0009,
        sourceBatchNo: this.WslcrRecordList.ff0010,
        manufactureDate: this.formatDate(this.WslcrRecordList.ff0011),
        expiryDate: this.formatDate(this.WslcrRecordList.ff0012),
        wSValidityOn: this.formatDate(this.WslcrRecordList.ff0013),
        lotValidityUpTo: this.formatDate(this.WslcrRecordList.ff0014),
        // usageType: this.WslcrRecordList.ff0015,
        noOfPurities: this.WslcrRecordList.ff0016,
        // noOfPuritiesUOM: this.WslcrRecordList.ff0017,
        containerValidityDays: this.WslcrRecordList.ff0018,
        // containerStartingNumber: this.WslcrRecordList.ff0019,
        noOfContainer: this.WslcrRecordList.ff0020,
        alertContainerNumber: this.WslcrRecordList.ff0021,
        totalContainerQty: this.WslcrRecordList.ff0022,
        // totalContainerUOM: this.WslcrRecordList.ff0023,
      });
    });
  }
  getWslcurRecordList(lc0003: any) {
    this.wslrService.getWslcurRecordList(lc0003).subscribe((data: any) => {
      this.WslcurRecordList = data.data;
      this.containerDetails = [];
      this.WslcurRecordList.forEach((element: any) => {
        this.containerDetails.push({
          // containerCode: element.ff0001,
          // wSLotNumber: element.ff0002,
          containerQty: element.ff0004,
          // lotValidUpTo: this.formatDate(element.ff0005),
          // containerValidUpTo: this.formatDate(element.ff0006),
          valueUOM: element.ff0009,
          // availableQty: element.ff0010
        });
      });
    });
  }
  getWslprRecordList(lc0003: any) {
    this.wslrService.getWslprRecordList(lc0003).subscribe((data: any) => {
      this.WslprRecordList = data.data;
      this.purityDetails = [];
      this.WslprRecordList.forEach((element: any) => {
        this.purityDetails.push({
          // purityCode: element.ff0001,
          // wSLotNumber: element.ff0002,
          purityType: element.ff0004,
          purityValue: element.ff0005,
          noOfPuritiesUOM: element.ff0006
        });

      });
    });
  }
 public downloadWSLRReport() {
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
    //     console.log(data);
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
  public downloadWSLRAttachedReport() {
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
    //     console.log(data);
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
    this.wslrService
      .onGetCommentsData(
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
        moduleCode
      )
      .subscribe((data: any) => {
        console.log(data);
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

