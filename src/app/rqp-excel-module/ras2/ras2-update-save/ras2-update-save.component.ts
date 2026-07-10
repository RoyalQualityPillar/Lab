import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, forkJoin, debounceTime, timer } from 'rxjs';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MessageService } from 'src/app/service/message.service';
import { ExcelHelperService } from '../../excel/excel-helper.service';
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
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-ras2-update-save',
  templateUrl: './ras2-update-save.component.html',
  styleUrls: ['./ras2-update-save.component.scss'],
  standalone: false,
})
export class Ras2UpdateSaveComponent implements OnInit, OnDestroy {
  public ViewDetailForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public assay: number;
  public lc0003: string;
  public ff0001: any;
  public currentComments: any;
  public dataSource: any;
  public reviewCommentsData: any;
  public displayedColumns: any;
  public nextStageListData: any;
  private destroy$ = new Subject<void>();
  public selectedDialogData: any;
  public assyType: string[] = ASSY_TYPE;
  public resviewCommentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'comments',
  ];
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    nextStage: new FormControl(''),
  });

  public numbers: any;
  public productInformation: FormGroup;
  public aveargeCalculate = new FormGroup({
    averageContent: new FormControl(''),
    averageAnhydrous: new FormControl(''),
    averageAnhydrousAndSolvent: new FormControl(''),
  });
  public assayCalculationForm: FormGroup;
  public standardDilutionForm: FormGroup;
  public samplePreparation: FormGroup;
  public sampleInformation = new FormGroup({
    sampleInfo: new FormArray([this.fields()]),
  });
  public roundUpValues: FormGroup;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private rqwMaterialAssayService: RqwMaterialAssayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private remoteLoader: RemoteComponentLoaderService,
    private excelHelperService: ExcelHelperService
  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
    this.numbers = this.excelHelperService.numbers;
    this.productInformation = this.excelHelperService.productInformation;
    this.assayCalculationForm = this.excelHelperService.assayCalculationForm;
    this.standardDilutionForm = this.excelHelperService.standardDilutionForm;
    this.samplePreparation = this.excelHelperService.samplePreparation;
    this.roundUpValues = this.excelHelperService.roundUpValues;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.pageData = {
        pageName: 'qt-review',
        pageType: 'update',
        requestNo: params.uc0001,
        version:
          params.ff0007 +
          '.' +
          params.ff0008 +
          '.' +
          params.ff0009 +
          '.' +
          params.ff0010,
        comments: params.comments,
      };
      this.rqwMaterialAssayService
        .moduleRequestNo(params.ff0001, params.uc0001)
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ data }) => {
          let list = forkJoin([
            this.rqwMaterialAssayService.asList(data[0].lc0003),
            this.rqwMaterialAssayService.commonList(data[0].lc0003),
          ]);

          list.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
            const common = data[1].data[0];
            const asi: any[] = data[0].data;
            this.commentForm.controls['comments'].patchValue(common.comments);
            this.assayCalculationForm.setValue({
              molecularWeightOne: common.ff0001,
              molecularWeightTwo: common.ff0002,
              standardAvgArea: common.ff0003,
              labelClaim: common.ff0004,
              standardPurity: common.ff0005,
            });

            this.standardDilutionForm.setValue({
              mgToOne: common.ff0006,
              mlOne: common.ff0007,
              mlToTwo: common.ff0008,
              mlTwo: common.ff0009,
              mlToThree: common.ff0010,
              mlThree: common.ff0011,
              mlToFour: common.ff0012,
              mlFour: common.ff0013,
              mlToFive: common.ff0014,
              mlFive: common.ff0015,
              mlToSix: common.ff0016,
              mlSix: common.ff0017,
            });

            this.samplePreparation.setValue({
              mlOne: common.ff0018,
              mlToOne: common.ff0019,
              mlTwo: common.ff0020,
              mlToTwo: common.ff0021,
              mlThree: common.ff0022,
              mlToThree: common.ff0023,
              mlFour: common.ff0024,
              mlToFour: common.ff0025,
              mlFive: common.ff0026,
              mlToFive: common.ff0027,
              mlSix: common.ff0028,
            });

            this.roundUpValues.setValue({
              dropdownContent: +common.ff0029,
              dropdownAnhydrous: +common.ff0030,
              dropdownSolvent: +common.ff0031,
            });

            this.aveargeCalculate.setValue({
              averageContent: common.ff0032,
              averageAnhydrous: common.ff0033,
              averageAnhydrousAndSolvent: common.ff0034,
            });

            this.productInformation.setValue({
              productName: common.ff0060,
              protocolNo: common.ff0061,
              sampleDes: common.ff0062,
              testParameter: common.ff0063,
              standardnumber: common.ff0064,
              standardname: common.ff0065,
              analystName: common.ff0066,
              batchNo: common.ff0067,
              arNo: common.ff0068,
              lowerLimit: common.ff0035,
              upperLimit: common.ff0036,
              assayType: common.ff0069,
              result: common.ff0070,
            });

            for (let i = 1; i < asi.length; i++) {
              this.getFormArray().push(this.fields());
            }

            asi.forEach((element, i: number) => {
              this.getFormArray().at(i).setValue({
                sampleDetails: element.ff0001,
                spiArea: element.ff0002,
                splWeight: element.ff0003,
                waterLod: element.ff0004,
                solvent: element.ff0005,
                basisContent: element.ff0006,
                anhydrousBasis: element.ff0007,
                ashydrousAndSolventFreeBasis: element.ff0008,
              });
            });
          });
        });
    });

    this.formsUpdate();
  }

  private formsUpdate(): void {
    const forms = [
      this.sampleInformation,
      this.assayCalculationForm,
      this.standardDilutionForm,
      this.samplePreparation,
      this.roundUpValues,
      this.aveargeCalculate,
    ];
    forms.forEach((form: FormGroup) => {
      form.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
        if (data) {
          this.forms();
        }
      });
    });
  }

  // public onReviewData(): void {
  //   this.rqwMaterialAssayService
  //     .onCommentsData(this.headerData.requestNo, this.headerData.lcnum)
  //     .subscribe((data: any) => {
  //       this.reviewCommentsData = data.data;
  //       this.dataSource = new MatTableDataSource(this.reviewCommentsData);
  //       //this.dataSource.sort=this.sort;
  //     });
  // }
  public getCommentsData(event: any): void {
    this.currentComments = event;
  }
  public onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
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
  public openNextStageLov(): void {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Next Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.nextStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.commentForm.controls['nextStage'].setValue(result.data.stage);
      }
    });
  }
  public getFormArray(): FormArray {
    return this.sampleInformation.get('sampleInfo') as FormArray;
  }

  private fields(): FormGroup {
    return this.fb.group({
      sampleDetails: new FormControl(),
      spiArea: new FormControl(),
      splWeight: new FormControl(),
      waterLod: new FormControl(),
      solvent: new FormControl(),
      basisContent: new FormControl(),
      anhydrousBasis: new FormControl(),
      ashydrousAndSolventFreeBasis: new FormControl(),
    });
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
    //this.onReviewData();
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
    if (avgBasisContent && avgAnhydrousBasis && avgAnhydrousAndSolvent) {
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

    this.checkContentHandler();
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
      ff0040: +this.roundUpValues.value.dropdownSolvent,
      ff0041: +this.aveargeCalculate.value.averageContent,
      ff0042: +this.aveargeCalculate.value.averageAnhydrous,
      ff0043: +this.aveargeCalculate.value.averageAnhydrousAndSolvent,
      ff0044: this.productInformation.value.lowerLimit,
      ff0045: this.productInformation.value.upperLimit,
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
      comments: this.currentComments,
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
      formArrayData[`ff000${value}`] = +sampleDetails;
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
        unitcode: '',
        createdby: '',
        status: 0,
        comments: this.currentComments,
      };
      rasiList.push(Object.assign(data, formArrayData));
    }

    const lcRequest = {
      unitCode: this.headerData.unitcode,
      moduleCode: this.headerData.modulecode,
      departmentCode: this.headerData.departmentcode,
      lcrqNumber: this.headerData.requestNo,
      lcNumber: this.headerData.lcnum,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.headerData.stage,
      createdBy: this.headerData.createdby,
      comments: this.currentComments,
      documentModule: '',
      documentStatus: '',
      draft: draft,
    };

    let sendValue = {
      lcRequest: lcRequest,
      commonDtoList: records,
      as1DtoList: rasiList,
    };


    this.rqwMaterialAssayService
      .save(sendValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
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
      field.controls['splWeight'].patchValue('1');
      field.controls['waterLod'].patchValue('1');
      field.controls['solvent'].patchValue('1');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
