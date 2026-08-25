import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, debounceTime, timer, takeUntil } from 'rxjs';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import { ExcelHelperService } from '../../excel/excel-helper.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import {
  ASSY_TYPE,
  CONTENT_AS_BASIS,
  PASS,
  FAIL,
  CONTENT_ANHYDROUS,
} from '../../excel/excel.constants';
import { RqwMaterialAssayService } from '../../service/rqw-material-assay.service';
//import { CommonESignatureComponent } from 'src/app/common/common-e-signature/common-e-signature.component';
import { NotificationService } from 'src/app/common/notification.service';

@Component({
  selector: 'app-mrssst-init',
  templateUrl: './mrssst-init.component.html',
  styleUrls: ['./mrssst-init.component.scss'],
  standalone: false,
})
export class MrssstInitComponent implements OnInit, OnDestroy {
  public ViewDetailForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public assay: number;
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    nextStage: new FormControl(''),
  });
  selectedDialogData: any;
  destroy$ = new Subject<void>();
  public numbers: any;
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
    averageContent: new FormControl(''),
    averageAnhydrous: new FormControl(''),
    averageAnhydrousAndSolvent: new FormControl(''),
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
    dropdownContent: new FormControl(1),
    dropdownAnhydrous: new FormControl(1),
    dropdownSolvent: new FormControl(1),
  });
  public assyType: string[] = ASSY_TYPE;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private rqwMaterialAssayService: RqwMaterialAssayService,
    private excelHelperService: ExcelHelperService,
    private remoteLoader: RemoteComponentLoaderService,
    private router: Router
  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
    this.numbers = this.excelHelperService.numbers;

  }

  ngOnInit(): void {
    this.formsUpdate();
    this.productInformation.reset();
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'RAS1-Initiator',
    };
    this.forms();
  }

  private formsUpdate(): void {
    const forms = [
      this.sampleInformation,
      this.assayCalculationForm,
      this.standardDilutionForm,
      this.samplePreparation,
      this.roundUpValues,
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
    return this.excelHelperService.fields();
  }

  public addFields() {
    return this.getFormArray().push(this.fields());
  }

  public removeFields(index: number) {
    return this.getFormArray().removeAt(index);
  }

  public getHeaderData(event: any) {
    this.headerData = event;
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
  }

  public checkContentHandler(): void {
    const { lowerLimit, upperLimit, assayType } = this.productInformation.value;
    const isWithinLimit = (value: number) =>
      +lowerLimit <= value && value <= +upperLimit;
    const { averageContent, averageAnhydrous, averageAnhydrousAndSolvent } =
      this.aveargeCalculate.value;

    if (lowerLimit && upperLimit && assayType) {
      const checkBasisContent = isWithinLimit(+averageContent);
      const checkAnhydrousBasis = isWithinLimit(+averageAnhydrous);
      const checkAshydrousAndSolventFreeBasis = isWithinLimit(
        +averageAnhydrousAndSolvent
      );
      this.contentHandlerReponse(
        checkBasisContent,
        checkAnhydrousBasis,
        checkAshydrousAndSolventFreeBasis
      );
    } else {
      this.productInformation.get('result').reset();
    }
  }

  private contentHandlerReponse(
    checkBasisContent: boolean,
    checkAnhydrousBasis: boolean,
    checkAshydrousAndSolventFreeBasis: boolean
  ) {
    const { assayType } = this.productInformation.value;
    const result = this.productInformation.controls['result'];
    if (assayType === CONTENT_AS_BASIS) {
      const CheckCondition = checkBasisContent ? PASS : FAIL;
      result.setValue(CheckCondition);
    } else if (assayType === CONTENT_ANHYDROUS) {
      const CheckCondition = checkAnhydrousBasis ? PASS : FAIL;
      result.setValue(CheckCondition);
    } else {
      const CheckCondition = checkAshydrousAndSolventFreeBasis ? PASS : FAIL;
      result.setValue(CheckCondition);
    }
  }

  private forms() {
    let totalBasisContent: number;
    let totalAnhydrousBasis: number;
    let totalAnhydrousAndSolvent: number;
    const {
      molecularWeightOne,
      molecularWeightTwo,
      standardAvgArea,
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
      let { spiArea, splWeight } = this.getFormArray().at(i).value;
      this.assay =
        (Number(spiArea) / Number(standardAvgArea)) *
        (Number(mgToOne) / Number(mlOne)) *
        (Number(mlToTwo) / Number(mlTwo)) *
        (Number(mlToThree) / Number(mlThree)) *
        (Number(mlToFour) / Number(mlFour)) *
        (Number(mlToFive) / Number(mlFive)) *
        (Number(mlToSix) / Number(mlSix)) *
        (Number(this.samplePreparation.value.mlOne) / Number(splWeight)) *
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
        100;

      const { waterLod, solvent } = this.getFormArray().at(i).value;

      const ab1 = +this.assay * (100 / (100 - waterLod));
      const an1 =
        +this.assay * (100 / (100 - waterLod)) * (100 / (100 - solvent));

      let valueOne = +this.roundUpValues.value.dropdownContent;
      const formArray = this.getFormArray().at(i);
      valueOne
        ? formArray
          .get('basisContent')
          .patchValue(Number(this.assay).toFixed(valueOne).toString())
        : formArray.get('basisContent').patchValue(this.assay.toString());

      let valueTwo = +this.roundUpValues.value.dropdownAnhydrous;
      valueTwo
        ? formArray
          .get('anhydrousBasis')
          .patchValue(Number(ab1).toFixed(valueTwo).toString())
        : formArray.get('anhydrousBasis').patchValue(ab1.toString());

      let valueThree = +this.roundUpValues.value.dropdownSolvent;
      valueThree
        ? formArray
          .get('ashydrousAndSolventFreeBasis')
          .patchValue(Number(an1).toFixed(valueThree).toString())
        : formArray
          .get('ashydrousAndSolventFreeBasis')
          .patchValue(an1.toString());

      totalBasisContent = +formArray.get('basisContent').value;
      totalAnhydrousBasis = +formArray.get('anhydrousBasis').value;
      totalAnhydrousAndSolvent = +formArray.get('ashydrousAndSolventFreeBasis')
        .value;
    }

    const avgBasisContent = totalBasisContent / this.getFormArray().length;
    const avgAnhydrousBasis = totalAnhydrousBasis / this.getFormArray().length;
    const avgAnhydrousAndSolvent =
      totalAnhydrousAndSolvent / this.getFormArray().length;
    const { dropdownContent, dropdownAnhydrous, dropdownSolvent } =
      this.roundUpValues.value;
    this.aveargeCalculate.setValue({
      averageContent: Number(avgBasisContent)
        .toFixed(+dropdownContent)
        .toString(),
      averageAnhydrous: Number(avgAnhydrousBasis)
        .toFixed(+dropdownAnhydrous)
        .toString(),
      averageAnhydrousAndSolvent: Number(avgAnhydrousAndSolvent)
        .toFixed(+dropdownSolvent)
        .toString(),
    });
  }
  public handleCommentsForm(event: Event) {
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
      ff0029: +this.roundUpValues.value.dropdownContent,
      ff0030: +this.roundUpValues.value.dropdownAnhydrous,
      ff0031: +this.roundUpValues.value.dropdownSolvent,
      ff0032: +this.aveargeCalculate.value.averageContent,
      ff0033: +this.aveargeCalculate.value.averageAnhydrous,
      ff0034: +this.aveargeCalculate.value.averageAnhydrousAndSolvent,
      ff0035: this.productInformation.value.lowerLimit,
      ff0036: this.productInformation.value.upperLimit,
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
      ff0064: this.productInformation.value.standardnumber,
      ff0065: this.productInformation.value.standardname,
      ff0066: this.productInformation.value.analystName,
      ff0067: this.productInformation.value.batchNo,
      ff0068: this.productInformation.value.arNo,
      ff0069: this.productInformation.value.assayType,
      ff0070: this.productInformation.value.result,
      lc0001: 0,
      lc0002: 0,
      lc0003: 0,
      lc0004: 0,
      lc0005: 0,
      unitcode: '',
      createdby: '',
      status: 0,
      comments: this.commentForm.value.comments,
    };
    records.push(Object.assign(data, formArrayData));

    for (let i: number = 0; i < this.getFormArray().length; i++) {
      const sampleDetails = this.getFormArray()
        .at(i)
        ?.get('sampleDetails').value;
      const spiArea = this.getFormArray().at(i)?.get('spiArea').value;
      const splWeight = this.getFormArray().at(i)?.get('splWeight').value;
      const waterLod = this.getFormArray().at(i)?.get('waterLod').value;
      const solvent = this.getFormArray().at(i)?.get('solvent').value;
      const basisContent = this.getFormArray().at(i)?.get('basisContent').value;
      const anhydrousBasis = this.getFormArray()
        .at(i)
        ?.get('anhydrousBasis').value;
      const ashydrousAndSolventFreeBasis = this.getFormArray()
        .at(i)
        ?.get('ashydrousAndSolventFreeBasis').value;
      let value = 1;
      formArrayData[`ff000${value}`] = sampleDetails;
      ++value;
      formArrayData[`ff000${value}`] = +spiArea;
      ++value;
      formArrayData[`ff000${value}`] = +splWeight;
      ++value;
      formArrayData[`ff000${value}`] = +waterLod;
      ++value;
      formArrayData[`ff000${value}`] = +solvent;
      ++value;
      formArrayData[`ff000${value}`] = +basisContent;
      ++value;
      formArrayData[`ff000${value}`] = +anhydrousBasis;
      ++value;
      formArrayData[`ff000${value}`] = +ashydrousAndSolventFreeBasis;
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
        comments: this.commentForm.controls['comments'].value,
      };
      rasiList.push(Object.assign(data, formArrayData));
    }

    const lcRequest = {
      unitCode: this.headerData.unitcode,
      moduleCode: this.headerData.modulecode,
      departmentCode: this.headerData.departmentcode,
      // lcrqNumber: '',
      lcNumber: this.headerData.lcnum,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.headerData.stage,
      createdBy: this.headerData.createdby,
      comments: this.commentForm.controls['comments'].value,
      documentModule: '',
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
        this.notificationService.showSuccess(data.status, () => {
        });

        timer(2000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.router.navigateByUrl('/excel/rasi-home');
          });
      }
    });
  }
  nextStageListData: any;
  async onSubmit(draft: boolean) {
    if (
      this.commentForm.value.comments == '' ||
      this.commentForm.value.comments == null ||
      this.commentForm.value.comments == undefined
    ) {
      this.dialog.open(MessageDialogComponent, {
        data: { message: 'please add comments', heading: 'Error Information' },
      });
      return;
    }
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
          this.saveUpdate(draft);
        }
      }
    });
  }

  public cancel() {
    this.excelHelperService.cancel();
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
