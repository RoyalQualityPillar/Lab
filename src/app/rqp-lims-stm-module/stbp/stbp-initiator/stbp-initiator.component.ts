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
  public psmList: any[] = [];

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
