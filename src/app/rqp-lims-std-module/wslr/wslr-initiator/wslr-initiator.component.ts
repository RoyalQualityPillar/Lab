import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { WslrService } from '../wslr.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { NotificationService } from 'src/app/common/notification.service';
import { Router } from '@angular/router';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { Subject, takeUntil, timer } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-wslr-initiator',
  standalone: false,
  templateUrl: './wslr-initiator.component.html',
  styleUrl: './wslr-initiator.component.scss'
})
export class WslrInitiatorComponent implements OnInit {
  public workingStandardRegistrationForm: FormGroup; 
  public pageData: any;
  public headerData: any;
  public comments: string;
  public headerRequestBody: any;
  public nextStageListData: any;
  public isLoading: boolean;
  public selectedDialogData: any;
  public disableButtons = false;
  destroy$ = new Subject<void>();
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
      pageType: 'create',
      isRasiInit: 'BMR-Initiator',
    };
    this.headerRequestBody = this.lifeCycleDataService.getSelectedRowData();
    this.onLoadNextStageData();
  }
  getHeaderData(event: any) {
    this.headerData = event;
  }
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
  addPurity(){
this.purityDetails.push({
   purityCode: '',
   wSLotNumber: '',
   purityType:  '',
   purityValue: '',
});
   
  }
   removePurity(index: any){
this.purityDetails.splice(index, 1);
    }
    addContainer(){
this.containerDetails.push({
   containerCode: '',
   wSLotNumber: '',
   containerQty:  '',
   valueUOM: '',
   lotValidUpTo: '',
   containerValidUpTo: '',
   availableQty: ''
});
   
  }
   removeContainer(index: any){
this.containerDetails.splice(index, 1);
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
  async onSaveConfirmation() {
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

  }
  async onSubmitConfirmation() {
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

  }
  onSubmit(value: any) {
    console.log(this.workingStandardRegistrationForm.value);
    console.log(this.purityDetails);
    console.log(this.containerDetails);
    this.disableButtons = true;
    let draftValue: boolean;
    if (value == 1) {
      draftValue = false;
    } else {
      draftValue = true;
    }
    const workingStandardValue = this.workingStandardRegistrationForm.value;
    const purityRecordList: any[] = [];
    const containerRecordList: any[] = [];

const manufactureDate = moment(
  this.workingStandardRegistrationForm.value.manufactureDate
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
const expiryDate = moment(
  this.workingStandardRegistrationForm.value.expiryDate
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
const wSValidityOn = moment(
  this.workingStandardRegistrationForm.value.wSValidityOn
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
const lotValidityUpTo = moment(
  this.workingStandardRegistrationForm.value.lotValidityUpTo
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
console.log(manufactureDate);




    this.purityDetails.forEach((parameter: any) => {
        purityRecordList.push({
          uc0001: null,
          ff0001: parameter.purityCode,
          ff0002: parameter.wSLotNumber,
          ff0003: 0,
          ff0004: parameter.purityType,
          ff0005: parameter.purityValue,
          ff0006: "string",
          ff0007: 0,
          ff0008: "string",
          lc0001: "string",
          lc0002: "string",
          lc0003: "string",
          lc0004: "string",
          lc0005: "string",
          lc0006: "string",
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
        });


    });

    this.containerDetails.forEach((container: any) => {
      const lotValidUpTo = moment(
  container.lotValidUpTo
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
const containerValidUpTo = moment(
  container.containerValidUpTo
).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      containerRecordList.push({
         uc0001: null,
          ff0001: container.containerCode,
          ff0002: container.wSLotNumber,
          ff0003: 0,
          ff0004: container.containerQty,
          ff0005: lotValidUpTo,
          ff0006: containerValidUpTo,
          ff0007: 0,
          ff0008: 0,
          ff0009: container.valueUOM,
          ff0010: container.availableQty,
          ff0011: "string",
          ff0012: "string",
          ff0013: "string",
          ff0014: "string",
          ff0015: "string",
          lc0001: "string",
          lc0002: "string",
          lc0003: "string",
          lc0004: "string",
          lc0005: "string",
          lc0006: "string",
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
      });
             
    });

    let body = {
      lcRequest: {
        unitCode: this.headerData.unitcode,
        moduleCode: this.headerData.modulecode,
        departmentCode: this.headerData.departmentcode,
        lcNumber: this.headerData.lcnum,
        lcStage: this.headerData.stage,
        stage2: 0,
        draft: draftValue,
        comments: this.comments,
        requestType: '',
        createdBy: this.cookieService.get('userId'),
        lcRole: this.headerData.role,
        documentModule: 'LIMS-STD',
        documentStatus: '',
        gmuserDTOList: [],
      },
      wslcrRecord: 
        {
          uc0001: null,
          ff0001: workingStandardValue.wSLotNo,
          ff0002: workingStandardValue.productCode,
          ff0003: workingStandardValue.lotTypes,
          ff0004: workingStandardValue.sampleRefNumber,
          ff0005: workingStandardValue.containerType,
          ff0006: workingStandardValue.storageCondition,
          ff0007: workingStandardValue.lotQuantity,
          ff0008: workingStandardValue.lotQuantityUOM,
          ff0009: workingStandardValue.batchNumber,
            ff0010: workingStandardValue.sourceBatchNo,
          ff0011: manufactureDate,
          ff0012: expiryDate,
            ff0013: wSValidityOn,
          ff0014: lotValidityUpTo,
          ff0015: workingStandardValue.usageType,
            ff0016: workingStandardValue.noOfPurities,
          ff0017: workingStandardValue.noOfPuritiesUOM,
          ff0018: workingStandardValue.containerValidityDays,
            ff0019: workingStandardValue.containerStartingNumber,
          ff0020: workingStandardValue.noOfContainer,
          ff0021: workingStandardValue.alertContainerNumber,
          ff0022: workingStandardValue.totalContainerQty,
          ff0023: workingStandardValue.totalContainerUOM,
          ff0024: "string",
          ff0025: "string",
          lc0001: "string",
          lc0002: "string",
          lc0003: "string",
          lc0004: "string",
          lc0005: "string",
          lc0006: "string",
          createdby: this.cookieService.get('userId'),
          status: 0,
          comments: this.comments
        }
      ,
      "wslcurRecordList": containerRecordList,
      "wslprRecordList": purityRecordList,
   
    };
    this.isLoading = true;
    this.wslrService
      .onSaveWSLR(body)
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
              this.route.navigateByUrl('/rqplabui/lims-std/wslr-module-admin');
            });
        }
      });
  }
}
