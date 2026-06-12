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

@Component({
  selector: 'app-wslr-reviewer-save',
  standalone: false,
  templateUrl: './wslr-reviewer-save.component.html',
  styleUrl: './wslr-reviewer-save.component.scss'
})
export class WslrReviewerSaveComponent implements OnInit {
    public redirectUrl: string = '/rqpoperationui/lbms/iwr-module-admin';
  public workingStandardRegistrationForm: FormGroup; 
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
  public ff0002:any;
  public WslcrRecordList:any;
  public WslcurRecordList:any;
  public WslprRecordList:any;
  public purityDetails:any[] = [{
     purityCode: '',
     wSLotNumber: '',
     purityType:  '',
     purityValue: '',
  }]
  public containerDetails:any[] = [{
     containerCode: '',
     wSLotNumber: '',
     containerQty:  '',
     valueUOM: '',
     lotValidUpTo: '',
     containerValidUpTo: '',
     availableQty: ''
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
        wSLotNo: [''],
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
        usageType: [''],
        noOfPurities: [''],
        noOfPuritiesUOM: [''],
        containerValidityDays: [''],
        containerStartingNumber: [''],
        noOfContainer: [''],
        alertContainerNumber: [''],
        totalContainerQty: [''],
        totalContainerUOM: [''],
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
      this.WslcrRecordList = data.data;
    });
  }
   getWslcurRecordList(lc0003: any) {
    this.wslrService.getWslcurRecordList(lc0003).subscribe((data: any) => {
      this.WslcurRecordList = data.data;
    });
  }
   getWslprRecordList(lc0003: any) {
    this.wslrService.getWslprRecordList(lc0003).subscribe((data: any) => {
      this.WslprRecordList = data.data;
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
