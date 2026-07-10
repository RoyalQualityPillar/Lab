import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SdService } from 'src/app/rqp-sd-module/sd.service';
import { MessageService } from 'src/app/service/message.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { NUMBERS } from '../../constants/excel.constants';
import { EsService } from '../../service/es.service';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-es-reviewer-save',
  templateUrl: './es-reviewer-save.component.html',
  styleUrls: ['./es-reviewer-save.component.scss'],
  standalone: false,
})
export class EsReviewerSaveComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  pageData: any;
  headerData: any;
  ViewDetailForm: FormGroup;
  isPlantCodeSuccess: boolean;
  orgUnitCode: any;
  displayedColumns: any;
  selectedDialogData: any;
  isValueSelected = false;
  unitCodeData: any;
  SGST: any;
  CGST: any;
  IGST: any;
  totalGst = 0;
  salesUnitCode: any;
  public assay: number;
  public percentage: number;
  public modelReqData: any;
  public navigationData: any;
  public numbers = NUMBERS;
  private $destroy = new Subject();

  public assayCalculationForm = new FormGroup({
    molecularWeightOne: new FormControl(''),
    molecularWeightTwo: new FormControl(''),
    standardAvgArea: new FormControl(''),
    labelClaim: new FormControl(''),
    standardPurity: new FormControl(''),
  });

  public standardDilutionForm = new FormGroup({
    mgToOne: new FormControl(''),
    mlOne: new FormControl(''),
    mlToTwo: new FormControl(''),
    mlTwo: new FormControl(''),
    mlToThree: new FormControl(''),
    mlThree: new FormControl(''),
    mlToFour: new FormControl(''),
    mlFour: new FormControl(''),
    mlToFive: new FormControl(''),
    mlFive: new FormControl(''),
    mlToSix: new FormControl(''),
    mlSix: new FormControl(''),
  });

  public samplePreparation = new FormGroup({
    mlOne: new FormControl(''),
    mlToOne: new FormControl(''),
    mlTwo: new FormControl(''),
    mlToTwo: new FormControl(''),
    mlThree: new FormControl(''),
    mlToThree: new FormControl(''),
    mlFour: new FormControl(''),
    mlToFour: new FormControl(''),
    mlFive: new FormControl(''),
    mlToFive: new FormControl(''),
    mlSix: new FormControl(''),
  });

  public sampleInformation = new FormGroup({
    sampleInfo: new FormArray([this.fields()]),
  });

  public roundUpValues = new FormGroup({
    dropdownForAssy: new FormControl(''),
    dropdownForContent: new FormControl(''),
  });

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private sdService: SdService,
    private esService: EsService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
    };

    this.forms();

    this.route.queryParams.subscribe((params: any) => {
      this.navigationData = params;
      this.route.queryParams.subscribe((params: any) => {
        const uc0001 = params.uc0001;
        const ff0001 = params.ff0001;
        this.esService
          .moduleReq(uc0001, ff0001)
          .pipe(takeUntil(this.$destroy))
          .subscribe((module: any) => {
            this.modelReqData = module.data[0];
            this.assayCalculationForm.setValue({
              molecularWeightOne: this.modelReqData.ff0001,
              molecularWeightTwo: this.modelReqData.ff0002,
              standardAvgArea: this.modelReqData.ff0003,
              labelClaim: this.modelReqData.ff0004,
              standardPurity: this.modelReqData.ff0005,
            });

            this.standardDilutionForm.setValue({
              mgToOne: this.modelReqData.ff0006,
              mlOne: this.modelReqData.ff0007,
              mlToTwo: this.modelReqData.ff0008,
              mlTwo: this.modelReqData.ff0009,
              mlToThree: this.modelReqData.ff0010,
              mlThree: this.modelReqData.ff0011,
              mlToFour: this.modelReqData.ff0012,
              mlFour: this.modelReqData.ff0013,
              mlToFive: this.modelReqData.ff0014,
              mlFive: this.modelReqData.ff0015,
              mlToSix: this.modelReqData.ff0016,
              mlSix: this.modelReqData.ff0017,
            });

            this.samplePreparation.setValue({
              mlOne: this.modelReqData.ff0018,
              mlToOne: this.modelReqData.ff0019,
              mlTwo: this.modelReqData.ff0020,
              mlToTwo: this.modelReqData.ff0021,
              mlThree: this.modelReqData.ff0022,
              mlToThree: this.modelReqData.ff0023,
              mlFour: this.modelReqData.ff0024,
              mlToFour: this.modelReqData.ff0025,
              mlFive: this.modelReqData.ff0026,
              mlToFive: this.modelReqData.ff0027,
              mlSix: this.modelReqData.ff0028,
            });

            const form = this.sampleInformation.controls;

            this.getFormArray().push(this.fields());
            let value = 29;
            form.sampleInfo.controls.forEach((field, index) => {
              field.controls['sampleDetails'].patchValue(
                this.modelReqData?.[`ff00${value}`].toString()
              );
              ++value;
              field.controls['spiArea'].patchValue(
                this.modelReqData?.[`ff00${value}`].toString()
              );
              ++value;
              field.controls['avgWt'].patchValue(
                this.modelReqData?.[`ff00${value}`].toString()
              );
              ++value;
              field.controls['splWt'].patchValue(
                this.modelReqData?.[`ff00${value}`].toString()
              );
              ++value;
            });
          });
      });
    });
  }

  ngAfterViewInit(): void {
    const forms = [
      this.sampleInformation,
      this.assayCalculationForm,
      this.standardDilutionForm,
      this.samplePreparation,
    ];
    forms.forEach((form: FormGroup) => {
      form.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
        if (data) {
          this.forms();
        }
      });
    });
  }

  public getFormArray(): FormArray {
    return this.sampleInformation.get('sampleInfo') as FormArray;
  }

  private fields(): FormGroup {
    return this.fb.group({
      sampleDetails: new FormControl('1'),
      spiArea: new FormControl('1'),
      avgWt: new FormControl('1'),
      splWt: new FormControl('1'),
      assayInMg: new FormControl(''),
      perContent: new FormControl(''),
    });
  }

  public addFields() {
    return this.getFormArray().push(this.fields());
  }

  public removeFields(index: number) {
    return this.getFormArray().removeAt(index);
  }

  private forms() {
    const {
      molecularWeightOne,
      molecularWeightTwo,
      standardAvgArea,
      labelClaim,
      standardPurity,
    } = this.assayCalculationForm.value;

    const {
      mgToOne,
      mlOne,
      mlToTwo,
      mlTwo,
      mlToThree,
      mlThree,
      mlToFour,
      mlFour,
      mlToFive,
      mlFive,
      mlToSix,
      mlSix,
    } = this.standardDilutionForm.value;

    for (let i = 0; i < this.getFormArray().length; i++) {
      let { spiArea, avgWt, splWt } = this.getFormArray().at(i).value;
      this.assay =
        (Number(spiArea) / Number(standardAvgArea)) *
        (Number(mgToOne) / Number(mlOne)) *
        (Number(mlToTwo) / Number(mlTwo)) *
        (Number(mlToThree) / Number(mlThree)) *
        (Number(mlToFour) / Number(mlFour)) *
        (Number(mlToFive) / Number(mlFive)) *
        (Number(mlToSix) / Number(mlSix)) *
        (Number(this.samplePreparation.value.mlOne) / Number(splWt)) *
        (Number(this.samplePreparation.value.mlTwo) /
          Number(this.samplePreparation.value.mlToOne)) *
        (Number(this.samplePreparation.value.mlThree) /
          Number(this.samplePreparation.value.mlToTwo)) *
        (Number(this.samplePreparation.value.mlFour) /
          Number(this.samplePreparation.value.mlToThree)) *
        (Number(this.samplePreparation.value.mlFive) /
          Number(this.samplePreparation.value.mlToFour)) *
        (Number(this.samplePreparation.value.mlSix) /
          Number(this.samplePreparation.value.mlToFive)) *
        (Number(standardPurity) / 100) *
        (Number(molecularWeightOne) / Number(molecularWeightTwo)) *
        Number(avgWt);

      this.percentage =
        (this.assay / +this.assayCalculationForm.value.labelClaim) * 100.0;

      let valueOne = +this.roundUpValues.value.dropdownForAssy;
      const formArray = this.getFormArray().at(i);
      valueOne
        ? formArray
            .get('assayInMg')
            .patchValue(Number(this.assay).toFixed(valueOne).toString())
        : formArray.get('assayInMg').patchValue(this.assay.toString());

      let valueTwo = +this.roundUpValues.value.dropdownForContent;
      valueTwo
        ? formArray
            .get('perContent')
            .patchValue(Number(this.percentage).toFixed(valueTwo).toString())
        : formArray.get('perContent').patchValue(this.percentage.toString());
    }
  }

  public getHeaderData(event: any) {
    this.headerData = event;
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
  }

  public onChangeCont() {
    let value = +this.roundUpValues.value.dropdownForAssy;
    for (let i = 0; i < this.getFormArray().length; i++) {
      let { assayInMg } = this.getFormArray().at(i).value;
      this.getFormArray()
        .at(i)
        .get('assayInMg')
        .patchValue(Number(+assayInMg).toFixed(value).toString());
    }
  }

  public onPercentage() {
    let value = +this.roundUpValues.value.dropdownForContent;
    for (let i = 0; i < this.getFormArray().length; i++) {
      let { perContent } = this.getFormArray().at(i).value;
      this.getFormArray()
        .at(i)
        .get('perContent')
        .patchValue(Number(+perContent).toFixed(value).toString());
    }
  }

  onChangeOrgUnitCode() {
    if (this.ViewDetailForm.controls['orgUnitCode'].value == '') {
      this.ViewDetailForm.controls['orgUnitCode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.ViewDetailForm.controls['orgUnitCode'].value;
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach((elements) => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['orgUnitCode'].setErrors({
          incorrect: true,
        });
        this.openOrgUnitCodeLov();
      }
    }
  }

  onViewDetails() {
    //todo
    if (this.ViewDetailForm.value) {
      if (
        this.ViewDetailForm.controls['orgUnitCode'].value != '' &&
        this.ViewDetailForm.controls['salesUnitCode'].value != ''
      ) {
        this.checkUnitCode();
      }
    }
  }

  openOrgUnitCodeLov() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Organization Unit Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.orgUnitCode,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.isValueSelected = true;
        this.ViewDetailForm.controls['orgUnitCode'].setValue(
          result.data.buunitcode
        );
        this.onViewDetails();
      }
    });
  }

  checkUnitCode() {
    this.sdService
      .getUnitCodeDetail(
        this.ViewDetailForm.controls['orgUnitCode'].value,
        this.ViewDetailForm.controls['salesUnitCode'].value
      )
      .subscribe((data: any) => {
        console.log(data);
        this.unitCodeData = data.data.content;
        this.setGSTData(this.unitCodeData);
      });
  }

  setGSTData(data) {
    if (data[0].ff0013 == data[1].ff0013) {
      this.CGST = this.totalGst / 2;
      this.SGST = this.totalGst / 2;
      this.IGST = 0;
    } else {
      this.IGST = this.totalGst;
      this.SGST = 0;
      this.CGST = 0;
    }
  }

  onChangeSalesUnitCode() {
    if (this.ViewDetailForm.controls['salesUnitCode'].value == '') {
      this.ViewDetailForm.controls['salesUnitCode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.ViewDetailForm.controls['salesUnitCode'].value;
      this.isPlantCodeSuccess = false;
      this.orgUnitCode.forEach((elements) => {
        if (elements.suunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
          this.onViewDetails();
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.ViewDetailForm.controls['salesUnitCode'].setErrors({
          incorrect: true,
        });
        this.openSalesUnitLov();
      }
    }
  }

  openSalesUnitLov() {
    this.displayedColumns = [
      { field: 'suunitcode', title: 'Code' },
      { field: 'suunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Sales Unit Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.salesUnitCode,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        // this.isValueSelected=true;
        this.ViewDetailForm.controls['salesUnitCode'].setValue(
          result.data.suunitcode
        );
        this.onViewDetails();
      }
    });
  }

  public saveUpdate() {
    let data: any = {};
    let formArrayData = {};
    for (let i: number = 0; i < this.getFormArray().length; i++) {
      const { spiArea, avgWt, splWt, sampleDetails, assayInMg } =
        this.getFormArray().at(i).value;
      let value = 30;
      formArrayData[`ff00${value}`] = +spiArea;
      ++value;
      formArrayData[`ff00${value}`] = +avgWt;
      ++value;
      formArrayData[`ff00${value}`] = +splWt;
      ++value;
      formArrayData[`ff00${value}`] = +sampleDetails;
      ++value;
      formArrayData[`ff00${value}`] = +assayInMg;
      ++value;

      data = {
        ...data,
        uc0001: this.ViewDetailForm.value.orgUnitCode,
        ff0001: +this.assayCalculationForm.value.molecularWeightOne,
        ff0002: +this.assayCalculationForm.value.molecularWeightTwo,
        ff0003: +this.assayCalculationForm.value.standardAvgArea,
        ff0004: +this.assayCalculationForm.value.labelClaim,
        ff0005: +this.assayCalculationForm.value.standardPurity,
        ff0006: +this.standardDilutionForm.value.mgToOne,
        ff0007: +this.standardDilutionForm.value.mlOne,
        ff0008: +this.standardDilutionForm.value.mlTwo,
        ff0009: +this.standardDilutionForm.value.mlToThree,
        ff0010: +this.standardDilutionForm.value.mlThree,
        ff0011: +this.standardDilutionForm.value.mlToFour,
        ff0012: +this.standardDilutionForm.value.mlFour,
        ff0013: +this.standardDilutionForm.value.mlToFive,
        ff0014: +this.standardDilutionForm.value.mlFive,
        ff0015: +this.standardDilutionForm.value.mlToSix,
        ff0016: +this.standardDilutionForm.value.mlSix,
        ff0017: +this.samplePreparation.value.mlOne,
        ff0018: +this.samplePreparation.value.mlToOne,
        ff0019: +this.samplePreparation.value.mlTwo,
        ff0020: +this.samplePreparation.value.mlToTwo,
        ff0021: +this.samplePreparation.value.mlThree,
        ff0022: +this.samplePreparation.value.mlToThree,
        ff0023: +this.samplePreparation.value.mlFour,
        ff0024: +this.samplePreparation.value.mlToFour,
        ff0025: +this.samplePreparation.value.mlFive,
        ff0026: +this.samplePreparation.value.mlToFive,
        ff0027: +this.samplePreparation.value.mlSix,
        ff0028: +this.roundUpValues.value.dropdownForAssy,
        ff0029: +this.roundUpValues.value.dropdownForContent,
        ff0037: 0,
        ff0038: 0,
        ff0039: 0,
        ff0040: 0,
        ff0041: 0,
        ff0042: 0,
        ff0043: 0,
        ff0044: 0,
        ff0045: 0,
        ff0046: 0,
        ff0047: 0,
        ff0048: 0,
        ff0049: 0,
        ff0050: 0,
        ff0051: 0,
        lc0001: 0,
        lc0002: 0,
        lc0003: 0,
        lc0004: 0,
        lc0005: 0,
        unitcode: '',
        createdby: '',
        status: 0,
        comments: '',
      };
    }

    Object.assign(data, formArrayData);
    this.esService.saveUpdate(data).subscribe((data) => {
      if (data.errorInfo) {
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
      }
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
