import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from 'src/app/common/notification.service';
import { PmsListComponent } from 'src/app/rqp-lims-sm-module/spm-masters/pms-list/pms-list.component';
import { SpmService } from 'src/app/rqp-lims-sm-module/spm/spm.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { ToolbarService } from 'src/app/service/toolbar.service';

@Component({
  selector: 'app-stbp-initiator',
  standalone: false,
  templateUrl: './stbp-initiator.component.html',
  styleUrl: './stbp-initiator.component.scss'
})
export class StbpInitiatorComponent implements OnInit {
  public STBPRequirementForm: FormGroup;
  public SampleInformationForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public nextStageListData: any;
  public headerRequestBody: any;
  public isSubjectCodeSuccess: boolean;
  public selectedDialogData: any;
  public displayedColumns: any;
  public comments: string;
  public draftValue: any;
  public psmList: any[] = [];
  public sampleRequirementList: any[] = [
  {
    sno: 1,
    timePoint: 'Initial',
    plannedPull: 10,
    testSample: 0,
    reserve: 0,
    retest: 0,
    total: 0,
    unit: 'Nos',
    sampleId: '',
    gracePeriod: '',
    status: 'ACTIVE'
  },
  {
    sno: 2,
    timePoint: '1 Month',
    plannedPull: 10,
    testSample: 0,
    reserve: 0,
    retest: 0,
    total: 0,
    unit: 'Nos',
    sampleId: '',
    gracePeriod: '',
    status: 'ACTIVE'
  },
  {
    sno: 3,
    timePoint: '3 Months',
    plannedPull: 10,
    testSample: 0,
    reserve: 0,
    retest: 0,
    total: 0,
    unit: 'Nos',
    sampleId: '',
    gracePeriod: '',
    status: 'ACTIVE'
  }
];

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
    this.STBPRequirementForm = fb.group({
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
      batchNo: [''],
      manufactureDate: [''],
      expireDate: [''],
      objective: [''],
    });
    this.SampleInformationForm = fb.group({
      storageCondition: [''],
    });
  }

  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'spm-Initiator',
    };
    // this.onloadDropDownList();

    this.onLoadNextStageData();
  }

  getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.spmService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
  }

  public handleCommentsForm(event: any) {
    this.comments = event.comments;
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

calculateTotal(row: any): void {
  console.log(row);
  row.total =
    (Number(row.testSample) || 0) +
    (Number(row.reserve) || 0) +
    (Number(row.retest) || 0);
    console.log(row.total);
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
  public Submit(btnStatus: any) {
    if(btnStatus == 1){
this.draftValue = false;
    } else {
      this.draftValue = true;
    }
const body = {
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
  "sprRecordList": [
    {
      "uc0001": "string",
      "ff0001": "string",
      "ff0002": "string",
      "ff0003": "string",
      "ff0004": "string",
      "ff0005": "string",
      "ff0006": 0,
      "ff0007": "string",
      "ff0008": "2026-09-17T07:37:19.445Z",
      "ff0009": "string",
      "ff0010": "string",
      "ff0011": "string",
      "ff0012": 0,
      "ff0013": "string",
      "ff0014": "2026-09-17T07:37:19.445Z",
      "ff0015": "string",
      "ff0016": 0,
      "ff0017": 0,
      "ff0018": "2026-09-17T07:37:19.445Z",
      "createdby": "string",
      "status": 0,
      "comments": "string"
    }
  ],
  "spsrRecordList": [
    {
      "uc0001": "string",
      "uc0002": 0,
      "uc0003": "string",
      "ff0001": "string",
      "ff0002": "string",
      "ff0003": "2026-09-17T07:37:19.445Z",
      "ff0004": "2026-09-17T07:37:19.445Z",
      "ff0005": "string",
      "ff0006": 0,
      "createdby": "string",
      "status": 0,
      "comments": "string"
    }
  ],
  "spstrRecordList": [
    {
      "uc0001": "string",
      "uc0002": 0,
      "uc0003": "string",
      "uc0004": "string",
      "ff0001": "string",
      "ff0002": "string",
      "ff0003": "string",
      "ff0004": "string",
      "ff0005": "string",
      "ff0006": "string",
      "ff0007": "string",
      "ff0008": "string",
      "ff0009": "string",
      "ff0010": "string",
      "ff0011": "string",
      "ff0012": "string",
      "ff0013": "string",
      "ff0014": "string",
      "ff0015": "string",
      "ff0016": "string",
      "ff0017": "string",
      "ff0018": "string",
      "ff0019": "string",
      "ff0020": "string",
      "ff0021": "string",
      "ff0022": "string",
      "ff0023": "string",
      "ff0024": "string",
      "ff0025": "string",
      "ff0026": "string",
      "ff0027": "string",
      "ff0028": "string",
      "ff0029": "string",
      "ff0030": "string",
      "createdby": "string",
      "status": 0,
      "comments": "string"
    }
  ],
  "srsmRecordList": [
    {
      "uc0001": "string",
      "ff0001": "string",
      "ff0002": "string",
      "ff0003": "string",
      "ff0004": "string",
      "ff0005": "string",
      "ff0006": "string",
      "ff0007": "string",
      "ff0008": "2026-09-17T07:37:19.446Z",
      "ff0009": "string",
      "ff0010": "string",
      "ff0011": 0,
      "ff0012": "string",
      "ff0013": "string",
      "ff0014": 0,
      "ff0015": "2026-09-17T07:37:19.446Z",
      "ff0016": 0,
      "ff0017": "string",
      "lc0001": "string",
      "lc0002": "string",
      "lc0003": "string",
      "lc0004": "string",
      "createdby": "string",
      "status": 0,
      "comments": "string"
    }
  ]
}
console.log(body);
this.spmService.saveStabilityProtocol(body).subscribe((data:any) =>{

});
  }


  onChangeSubject() {
    if (this.STBPRequirementForm.controls['productNo'].value == '') {
      this.STBPRequirementForm.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.STBPRequirementForm.controls['productNo'].value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.STBPRequirementForm.controls['productNo'].setErrors({
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
        this.STBPRequirementForm.controls['productNo'].setValue(
          this.selectedDialogData.productNO
        );

        this.spmService
          .productList(this.selectedDialogData.productNO)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.STBPRequirementForm.patchValue({
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

  onChangeStorageCondition() {
    if (this.STBPRequirementForm.controls['productNo'].value == '') {
      this.STBPRequirementForm.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.STBPRequirementForm.controls['productNo'].value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.STBPRequirementForm.controls['productNo'].setErrors({
          incorrect: true,
        });
        this.openStorageConditionLOV();
      }
    }
  }
  openStorageConditionLOV() {
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
        this.STBPRequirementForm.controls['productNo'].setValue(
          this.selectedDialogData.productNO
        );
      }
    });
  }



}
