import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { SdService } from 'src/app/rqp-sd-module/sd.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NUMBERS } from '../../constants/excel.constants';
import { EsService } from '../../service/es.service';
import { ExcelHelperService } from '../../excel/excel-helper.service';
import { RqwMaterialAssayService } from '../../service/rqw-material-assay.service';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-es-initiator',
  templateUrl: './es-initiator.component.html',
  styleUrls: ['./es-initiator.component.scss'],
  standalone: false,
})
export class EsInitiatorComponent implements OnInit, AfterViewInit, OnDestroy {
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
  public numbers = NUMBERS;
  private $destroy = new Subject();

  public productInformation = new FormGroup({
    productName: new FormControl(''),
    protocolNo: new FormControl(''),
    sampleDes: new FormControl(''),
    testParameter: new FormControl(''),
    standardnumber: new FormControl(''),
    standardname: new FormControl(''),
    analystName: new FormControl(''),
    batchNo: new FormControl(''),
    arNo: new FormControl(''),
    lowerLimit: new FormControl(''),
    upperLimit: new FormControl(''),
    assayType: new FormControl(''),
    result: new FormControl(''),
  });
  public aveargeCalculate = new FormGroup({
    averageAssay: new FormControl(''),
    averageContent: new FormControl(''),
  });

  public assayCalculationForm = new FormGroup({
    molecularWeightOne: new FormControl('1'),
    molecularWeightTwo: new FormControl('1'),
    standardAvgArea: new FormControl('1'),
    labelClaim: new FormControl('1'),
    standardPurity: new FormControl('1'),
  });

  public standardDilutionForm = new FormGroup({
    mgToOne: new FormControl('1'),
    mlOne: new FormControl('1'),
    mlToTwo: new FormControl('1'),
    mlTwo: new FormControl('1'),
    mlToThree: new FormControl('1'),
    mlThree: new FormControl('1'),
    mlToFour: new FormControl('1'),
    mlFour: new FormControl('1'),
    mlToFive: new FormControl('1'),
    mlFive: new FormControl('1'),
    mlToSix: new FormControl('1'),
    mlSix: new FormControl('1'),
  });

  public samplePreparation = new FormGroup({
    mlOne: new FormControl('1'),
    mlToOne: new FormControl('1'),
    mlTwo: new FormControl('1'),
    mlToTwo: new FormControl('1'),
    mlThree: new FormControl('1'),
    mlToThree: new FormControl('1'),
    mlFour: new FormControl('1'),
    mlToFour: new FormControl('1'),
    mlFive: new FormControl('1'),
    mlToFive: new FormControl('1'),
    mlSix: new FormControl('1'),
  });

  public sampleInformation = new FormGroup({
    sampleInfo: new FormArray([this.fields()]),
  });

  public roundUpValues = new FormGroup({
    dropdownForAssy: new FormControl(1),
    dropdownForContent: new FormControl(1),
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private sdService: SdService,
    private esService: EsService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private excelHelperService: ExcelHelperService,
    private rqwMaterialAssayService: RqwMaterialAssayService
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
  }

  ngAfterViewInit(): void {
    const forms = [
      this.sampleInformation,
      this.assayCalculationForm,
      this.standardDilutionForm,
      this.samplePreparation,
    ];
    forms.forEach((form: FormGroup) => {
      form.valueChanges
        .pipe(debounceTime(300), takeUntil(this.$destroy))
        .subscribe((data) => {
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
    let totalAssay: number;
    let totalCotent: number;
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

      totalAssay = +formArray.get('assayInMg').value;
      totalCotent = +formArray.get('perContent').value;
    }

    let avearageAssay = totalAssay / this.getFormArray().length;
    let averageContent = totalCotent / this.getFormArray().length;
    this.aveargeCalculate
      .get('averageAssay')
      .setValue(avearageAssay.toString());

    this.aveargeCalculate
      .get('averageContent')
      .setValue(averageContent.toString());
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
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
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

  public saveUpdate(draft: boolean) {
    let data: any = {};
    let formArrayData = {};
    let records = [];
    let rasiList = [];
    data = {
      ff0001: +this.assayCalculationForm.value.molecularWeightOne,
      ff0002: +this.assayCalculationForm.value.molecularWeightTwo,
      ff0003: +this.assayCalculationForm.value.standardAvgArea,
      ff0004: +this.assayCalculationForm.value.labelClaim,
      ff0005: +this.assayCalculationForm.value.standardPurity,
      ff0006: +this.standardDilutionForm.value.mgToOne,
      ff0007: +this.standardDilutionForm.value.mlOne,
      ff0008: +this.standardDilutionForm.value.mlToTwo,
      ff0009: +this.standardDilutionForm.value.mlTwo,
      ff0010: +this.standardDilutionForm.value.mlToThree,
      ff0011: +this.standardDilutionForm.value.mlThree,
      ff0012: +this.standardDilutionForm.value.mlToFour,
      ff0013: +this.standardDilutionForm.value.mlFour,
      ff0014: +this.standardDilutionForm.value.mlToFive,
      ff0015: +this.standardDilutionForm.value.mlFive,
      ff0016: +this.standardDilutionForm.value.mlToSix,
      ff0017: +this.standardDilutionForm.value.mlSix,
      ff0018: +this.samplePreparation.value.mlOne,
      ff0019: +this.samplePreparation.value.mlToOne,
      ff0020: +this.samplePreparation.value.mlTwo,
      ff0021: +this.samplePreparation.value.mlToTwo,
      ff0022: +this.samplePreparation.value.mlThree,
      ff0023: +this.samplePreparation.value.mlToThree,
      ff0024: +this.samplePreparation.value.mlFour,
      ff0025: +this.samplePreparation.value.mlToFour,
      ff0026: +this.samplePreparation.value.mlFive,
      ff0027: +this.samplePreparation.value.mlToFive,
      ff0028: +this.samplePreparation.value.mlSix,
      ff0029: +this.roundUpValues.value.dropdownForAssy,
      ff0030: +this.roundUpValues.value.dropdownForContent,
      ff0037: +this.aveargeCalculate.value.averageAssay,
      ff0038: +this.aveargeCalculate.value.averageContent,
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
      ff0060: this.productInformation.value.productName,
      ff0061: this.productInformation.value.protocolNo,
      ff0062: this.productInformation.value.sampleDes,
      ff0063: this.productInformation.value.testParameter,
      ff0064: this.productInformation.value.analystName,
      ff0065: this.productInformation.value.batchNo,
      ff0066: this.productInformation.value.arNo,
      ff0067: '',
      ff0068: '',
      ff0069: '',
      ff0070: '',
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
    records.push(Object.assign(data, formArrayData));
    for (let i: number = 0; i < this.getFormArray().length; i++) {
      const sampleDetails = this.getFormArray()
        .at(i)
        ?.get('sampleDetails').value;
      const spiArea = this.getFormArray().at(i)?.get('spiArea').value;
      const avgWt = this.getFormArray().at(i)?.get('avgWt').value;
      const splWt = this.getFormArray().at(i)?.get('splWt').value;
      const assayInMg = this.getFormArray().at(i)?.get('assayInMg').value;
      const perContent = this.getFormArray().at(i)?.get('perContent').value;

      let value = 1;
      formArrayData[`ff000${value}`] = +sampleDetails;
      ++value;
      formArrayData[`ff000${value}`] = +spiArea;
      ++value;
      formArrayData[`ff000${value}`] = +avgWt;
      ++value;
      formArrayData[`ff000${value}`] = +splWt;
      ++value;
      formArrayData[`ff000${value}`] = +assayInMg;
      ++value;
      formArrayData[`ff000${value}`] = +perContent;
      ++value;

      data = {
        lc0001: 0,
        lc0002: 0,
        lc0003: 0,
        lc0004: 0,
        lc0005: 0,
        lc0006: '',
        unitcode: '',
        createdby: '',
        status: 0,
        comments: '',
      };
      rasiList.push(Object.assign(data, formArrayData));
    }

    const lcRequest = {
      unitCode: this.headerData.unitcode,
      moduleCode: this.headerData.modulecode,
      departmentCode: this.headerData.departmentcode,
      lcrqNumber: '',
      lcNumber: this.headerData.lcnum,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.headerData.stage,
      createdBy: this.headerData.createdby,
      comments: '',
      requestType: '',
      documentModule: 'ES',
      documentStatus: '',
      draft: draft,
    };

    let sendValue = {
      lcRequest: lcRequest,
      commonDtoList: records,
      as1DtoList: rasiList,
    };

    this.rqwMaterialAssayService.save(sendValue).subscribe((data) => {
      if (data.errorInfo) {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: data.errorInfo.message,
            heading: 'Error Information',
          },
        });
      } else {
        this.notificationService.showSuccess(data.status, () => { });
      }
    });
  }

  public cancel() {
    this.assayCalculationForm.setValue({
      molecularWeightOne: '1',
      molecularWeightTwo: '1',
      standardAvgArea: '1',
      labelClaim: '1',
      standardPurity: '1',
    });

    this.standardDilutionForm.setValue({
      mgToOne: '1',
      mlOne: '1',
      mlToTwo: '1',
      mlTwo: '1',
      mlToThree: '1',
      mlThree: '1',
      mlToFour: '1',
      mlFour: '1',
      mlToFive: '1',
      mlFive: '1',
      mlToSix: '1',
      mlSix: '1',
    });

    this.samplePreparation.setValue({
      mlOne: '1',
      mlToOne: '1',
      mlTwo: '1',
      mlToTwo: '1',
      mlThree: '1',
      mlToThree: '1',
      mlFour: '1',
      mlToFour: '1',
      mlFive: '1',
      mlToFive: '1',
      mlSix: '1',
    });

    const form = this.sampleInformation.controls;
    form.sampleInfo.controls.forEach((field) => {
      field.controls['sampleDetails'].patchValue('1');
      field.controls['spiArea'].patchValue('1');
      field.controls['avgWt'].patchValue('1');
      field.controls['splWt'].patchValue('1');
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
