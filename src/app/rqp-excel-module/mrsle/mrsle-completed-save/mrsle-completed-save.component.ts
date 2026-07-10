import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, forkJoin, Subject, takeUntil, timer } from 'rxjs';
import { ASSY_TYPE } from '../../excel/excel.constants';
import { MessageService } from 'src/app/service/message.service';
import { MatDialog } from '@angular/material/dialog';
import { RqwMaterialAssayService } from '../../service/rqw-material-assay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelHelperService } from '../../excel/excel-helper.service';
//import { MatTableDataSource } from '@angular/material/table';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-mrsle-completed-save',
  templateUrl: './mrsle-completed-save.component.html',
  styleUrls: ['./mrsle-completed-save.component.scss'],
  standalone: false
})
export class MrsleCompletedSaveComponent implements OnInit, OnDestroy {
  public ViewDetailForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public assay: number;
  concentrationArray: any[] = [];
  areaArray: any[] = [];
  result: any;
  linechartOptions: any;
  public isLoading = false;
  public lc0003: string;
  public ff0001: any;
  private ff0005: number;
  public currentComments: any;
  public dataSource: any;
  public reviewCommentsData: any;
  public displayedColumns: any;
  isPieChartDataAvailable: any;
  public nextStageListData: any;
  private destroy$ = new Subject<void>();
  public selectedDialogData: any;
  public previousStageListData: any;
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
    previousStage: new FormControl(''),
  });
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
    specification: new FormControl('0.98'),
    assayType: new FormControl(''),
    result: new FormControl(''),
  });
  public aveargeCalculate = new FormGroup({
    slope: new FormControl(''),
    intercept: new FormControl(''),
    correlation: new FormControl(''),
    rrf: new FormControl(''),
  });
  public assayCalculationForm = new FormGroup({
    standardPurity: new FormControl('1'),
    componentName: new FormControl(''),
    componentSlope: new FormControl('1'),
    standardSlope: new FormControl('1'),
  });
  public standardDilutionForm: FormGroup;
  // public samplePreparation: FormGroup =
  //   this.excelHelperService.samplePreparation;
  public sampleInformation = new FormGroup({
    sampleInfo: new FormArray([this.fields()]),
  });
  public roundUpValues = new FormGroup({
    dropdownContent: new FormControl(1),
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public dialog: MatDialog,
    private rqwMaterialAssayService: RqwMaterialAssayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private excelHelperService: ExcelHelperService
  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
    this.numbers = this.excelHelperService.numbers;
    this.standardDilutionForm = this.excelHelperService.standardDilutionForm;
  }

  ngOnInit(): void {
    this.concentrationArray.length = 0;
    this.areaArray.length = 0;
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
      this.ff0001 = params.uc0001;
      this.ff0005 = params.ff0007;
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
              standardPurity: common.ff0019,
              componentName: common.ff0020,
              componentSlope: common.ff0021,
              standardSlope: common.ff0022,
            });
            this.standardDilutionForm.setValue({
              mgToOne: common.ff0002,
              mlOne: common.ff0003,
              mlToTwo: common.ff0004,
              mlTwo: common.ff0005,
              mlToThree: common.ff0006,
              mlThree: common.ff0007,
              mlToFour: common.ff0008,
              mlFour: common.ff0009,
              mlToFive: common.ff0010,
              mlFive: common.ff0011,
              mlToSix: common.ff0012,
              mlSix: common.ff0013,
            });
            this.roundUpValues.setValue({
              dropdownContent: +common.ff0014,
            });

            this.aveargeCalculate.setValue({
              slope: common.ff0015,
              intercept: common.ff0016,
              correlation: common.ff0017,
              rrf: common.ff0018,
            });
            this.productInformation.setValue({
              productName: common.ff0051,
              protocolNo: common.ff0060,
              sampleDes: common.ff0061,
              testParameter: common.ff0062,
              standardnumber: common.ff0063,
              standardname: common.ff0064,
              analystName: common.ff0065,
              batchNo: common.ff0066,
              arNo: common.ff0067,
              specification: common.ff0068,
              assayType: common.ff0069,
              result: common.ff0070,
            });
            for (let i = 1; i < asi.length; i++) {
              this.getFormArray().push(this.fields());
            }
            asi.forEach((element, i: number) => {
              this.getFormArray().at(i).setValue({
                level: element.ff0001,
                volume: element.ff0002,
                dilution: element.ff0003,
                concentration: element.ff0004,
                area: element.ff0005,
              });
              this.concentrationArray.push(element.ff0004);
              this.areaArray.push(element.ff0005);
              if (
                this.concentrationArray.length > 1 &&
                this.areaArray.length > 1
              ) {
                this.isPieChartDataAvailable = true;
                this.createLineChart(this.concentrationArray, this.areaArray);
              }
            });
          });
        });
    });
  }
  private formsUpdate(): void {
    const forms = [
      this.sampleInformation,
      this.assayCalculationForm,
      this.standardDilutionForm,
      this.roundUpValues,
      this.aveargeCalculate,
    ];
    forms.forEach((form: FormGroup) => {
      form.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
        if (data) {
          this.forms(data);
        }
      });
    });
  }
  public getFormArray(): FormArray {
    return this.sampleInformation.get('sampleInfo') as FormArray;
  }

  public fields(): FormGroup {
    return this.fb.group({
      level: new FormControl('1'),
      volume: new FormControl('1'),
      dilution: new FormControl('1'),
      concentration: new FormControl(),
      area: new FormControl('1'),
    });
  }

  public addFields() {
    return this.getFormArray().push(this.fields());
  }

  public removeFields(index: number) {
    return this.getFormArray().removeAt(index);
  }
  public onReviewData(): void {
    this.rqwMaterialAssayService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        //this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        //this.dataSource.sort=this.sort;
      });
  }
  public getHeaderData(event: any) {
    this.headerData = event;
    this.ViewDetailForm.controls['orgUnitCode'].setValue(event.unitcode);
    this.onReviewData();
  }

  public forms(event?: any) {
    this.concentrationArray.length = 0;
    this.areaArray.length = 0;
    const { standardPurity } = this.assayCalculationForm.value;
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

    const { specification } = this.productInformation.value;
    for (let i = 0; i < this.getFormArray().length; i++) {
      const areaValue = this.getFormArray()?.at(i)?.get('area')?.value;
      const concentrationValue = this.getFormArray()
        ?.at(i)
        ?.get('concentration')?.value;

      if (concentrationValue) {
        this.concentrationArray.push(+concentrationValue);
      }

      if (areaValue) {
        this.areaArray.push(+areaValue);
      }
      let { volume, dilution } = this.getFormArray().at(i).value;
      this.assay =
        (Number(mgToOne) / Number(mlOne)) *
        (Number(mlToTwo) / Number(mlTwo)) *
        (Number(mlToThree) / Number(mlThree)) *
        (Number(mlToFour) / Number(mlFour)) *
        (Number(mlToFive) / Number(mlFive)) *
        (Number(mlToSix) / Number(mlSix)) *
        Number(volume / dilution) *
        (Number(standardPurity) / 100) *
        1000;
      this.getFormArray().at(i).get('concentration').patchValue(this.assay);
      let valueOne = +this.roundUpValues.value.dropdownContent;
      const formArray = this.getFormArray().at(i);
      valueOne
        ? formArray
          .get('concentration')
          .patchValue(Number(this.assay).toFixed(valueOne).toString())
        : formArray.get('concentration').patchValue(this.assay.toString());
    }
    const slope = this.calculateSlope(this.concentrationArray, this.areaArray);
    const intercept = this.calculateIntercept(
      this.concentrationArray,
      this.areaArray,
      +slope
    );
    const correlation = this.calculateCorrelationCoefficient(
      this.concentrationArray,
      this.areaArray
    );
    const { standardSlope, componentSlope } = this.assayCalculationForm.value;
    const rrf = +componentSlope / +standardSlope;
    this.aveargeCalculate.setValue({
      slope: slope.toString(),
      intercept: intercept.toString(),
      correlation: correlation.toString(),
      rrf: rrf.toString(),
    });

    if (+correlation > +specification) {
      this.result = true;
      this.productInformation.get('result').patchValue('Pass');
    } else {
      this.result = false;
      this.productInformation.get('result').patchValue('Fail');
    }

    if (this.concentrationArray.length > 1 && this.areaArray.length > 1) {
      this.isPieChartDataAvailable = true;
      this.createLineChart(this.concentrationArray, this.areaArray);
    }
  }
  public getCommentsData(event: any): void {
    this.currentComments = event;
  }
  public onRequestVersion(row) {
    return row.ff0005 + '.' + row.ff0006 + '.' + row.ff0007 + '.' + row.ff0008;
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
  openPreviousStageLov() {
    this.displayedColumns = [
      { field: 'stage', title: 'Code' },
      { field: 'lcRole', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Previous Stage',
        dialogColumns: this.displayedColumns,
        dialogData: this.previousStageListData,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.commentForm.controls['previousStage'].setValue(result.data.stage);
      }
    });
  }
  private calculateSlope(
    concentrations: number[],
    areas: number[]
  ): number | string {
    const n = concentrations.length;
    // if (n !== areas.length || n === 0) {
    //   return 'Input arrays must have the same non-zero length';
    // }
    const sumX = concentrations.reduce((a, b) => a + b, 0);
    const sumY = areas.reduce((a, b) => a + b, 0);
    const sumXY = concentrations
      .map((x, i) => x * areas[i])
      .reduce((a, b) => a + b, 0);
    const sumX2 = concentrations.map((x) => x * x).reduce((a, b) => a + b, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = n * sumX2 - sumX * sumX;

    // if (denominator === 0) {
    //   return 'Slope is undefined'; // Prevent division by zero
    // }

    return numerator / denominator;
  }

  private calculateIntercept(
    concentrations: number[],
    areas: number[],
    slope: number
  ): number {
    const x1 = concentrations[0]; // First concentration value
    const y1 = areas[0]; // Corresponding first area value

    return y1 - slope * x1; // Use the formula: intercept = y - mx
  }

  private calculateCorrelationCoefficient(
    concentrations: number[],
    areas: number[]
  ): number | string {
    const n = concentrations.length;

    if (n !== areas.length || n === 0) {
      return 'Input arrays must have the same non-zero length';
    }

    const sumX = concentrations.reduce((a, b) => a + b, 0);
    const sumY = areas.reduce((a, b) => a + b, 0);
    const sumXY = concentrations
      .map((x, i) => x * areas[i])
      .reduce((a, b) => a + b, 0);
    const sumX2 = concentrations.map((x) => x * x).reduce((a, b) => a + b, 0);
    const sumY2 = areas.map((y) => y * y).reduce((a, b) => a + b, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
    );

    // if (denominator === 0) {
    //   return 'Correlation is undefined'; // To avoid division by zero
    // }

    return numerator / denominator; // Pearson correlation coefficient
  }

  public saveUpdate(draft: boolean) {
    let data: any = {};
    let formArrayData = {};
    let records = [];
    let rasiList = [];
    data = {
      ff0001: +this.assayCalculationForm.value.standardPurity,
      ff0002: +this.standardDilutionForm.value.mgToOne,
      ff0003: +this.standardDilutionForm.value.mlOne,
      ff0004: +this.standardDilutionForm.value.mlToTwo,
      ff0005: +this.standardDilutionForm.value.mlTwo,
      ff0006: +this.standardDilutionForm.value.mlToThree,
      ff0007: +this.standardDilutionForm.value.mlThree,
      ff0008: +this.standardDilutionForm.value.mlToFour,
      ff0009: +this.standardDilutionForm.value.mlFour,
      ff0010: +this.standardDilutionForm.value.mlToFive,
      ff0011: +this.standardDilutionForm.value.mlFive,
      ff0012: +this.standardDilutionForm.value.mlToSix,
      ff0013: +this.standardDilutionForm.value.mlSix,
      ff0014: +this.roundUpValues.value.dropdownContent,
      ff0015: +this.aveargeCalculate.value.slope,
      ff0016: +this.aveargeCalculate.value.intercept,
      ff0017: +this.aveargeCalculate.value.correlation,
      ff0018: +this.aveargeCalculate.value.rrf,
      ff0019: +this.assayCalculationForm.value.standardPurity,
      ff0020: this.assayCalculationForm.value.componentName,
      ff0021: +this.assayCalculationForm.value.componentSlope,
      ff0022: +this.assayCalculationForm.value.standardSlope,
      ff0023: '',
      ff0024: '',
      ff0025: '',
      ff0026: '',
      ff0027: '',
      ff0028: '',
      ff0029: '',
      ff0030: '',
      ff0031: '',
      ff0032: '',
      ff0033: '',
      ff0034: '',
      ff0035: '',
      ff0036: '',
      ff0044: 0,
      ff0045: 0,
      ff0046: 0,
      ff0047: 0,
      ff0048: 0,
      ff0049: 0,
      ff0050: 0,
      ff0051: this.productInformation.value.productName,
      ff0060: this.productInformation.value.protocolNo,
      ff0061: this.productInformation.value.sampleDes,
      ff0062: this.productInformation.value.testParameter,
      ff0063: this.productInformation.value.standardnumber,
      ff0064: this.productInformation.value.standardname,
      ff0065: this.productInformation.value.analystName,
      ff0066: this.productInformation.value.batchNo,
      ff0067: this.productInformation.value.arNo,
      ff0068: this.productInformation.value.specification,
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
      const level = this.getFormArray().at(i)?.get('level').value;
      const volume = this.getFormArray().at(i)?.get('volume').value;
      const dilution = this.getFormArray().at(i)?.get('dilution').value;
      const concentration = this.getFormArray()
        .at(i)
        ?.get('concentration').value;
      const area = this.getFormArray().at(i)?.get('area').value;

      let value = 1;
      formArrayData[`ff000${value}`] = level;
      ++value;
      formArrayData[`ff000${value}`] = +volume;
      ++value;
      formArrayData[`ff000${value}`] = +dilution;
      ++value;
      formArrayData[`ff000${value}`] = +concentration;
      ++value;
      formArrayData[`ff000${value}`] = +area;
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
        comments: this.currentComments,
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

    this.rqwMaterialAssayService.save(sendValue).subscribe((data) => {
      if (data.errorInfo) {
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: data.errorInfo.message,
            heading: 'Error Information',
          },
        });
      } else {
        this.messageService.sendSnackbar(
          'success',
          '"MRSLE info Record inserted successfully'
        );

        timer(2000)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.router.navigateByUrl('/excel/rasi-home');
          });
      }
    });
  }

  // public onSubmit(draft?: boolean) {
  //   if (
  //     this.commentForm.value.comments == '' ||
  //     this.commentForm.value.comments == null ||
  //     this.commentForm.value.comments == undefined
  //   ) {
  //     this.dialog.open(MessageDialogComponent, {
  //       data: { message: 'please add comments', heading: 'Error Information' },
  //     });
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(ESignatureComponent, {
  //     height: '300px',
  //     width: '600px',
  //     data: {},
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.selectedDialogData = result.data;
  //       if (this.selectedDialogData) {
  //         this.saveUpdate(draft);
  //       }
  //     }
  //   });
  // }
  // onReject() {
  //   if (
  //     this.commentForm.value.comments == '' ||
  //     this.commentForm.value.comments == null ||
  //     this.commentForm.value.comments == undefined
  //   ) {
  //     this.dialog.open(MessageDialogComponent, {
  //       data: { message: 'please add comments', heading: 'Error Information' },
  //     });
  //     return;
  //   }
  //   const dialogRef = this.dialog.open(QMSESignatureComponent, {
  //     height: '300px',
  //     width: '600px',
  //     data: {},
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.selectedDialogData = result.data;
  //       if (this.selectedDialogData) {
  //         this.onCallRejectApi();
  //       }
  //     }
  //   });
  // }
  // onCallRejectApi() {
  //   let body = {
  //     unitCode: 'string',
  //     moduleCode: this.headerData.modulecode,
  //     departmentCode: 'string',
  //     lcrqNumber: this.pageData.requestNo,
  //     lcNumber: this.headerData.lcnum,
  //     lcStage: this.headerData.stage,
  //     lcRole: this.headerData.role,
  //     stage2: this.commentForm.controls['previousStage'].value,
  //     createdBy: this.headerData.createdby,
  //     comments: this.currentComments,
  //     documentModule: 'string',
  //     documentStatus: 'string',
  //     // draft: true
  //   };
  //   if (body.stage2 == '' || body.stage2 == undefined || body.stage2 == null) {
  //     body.stage2 = 0;
  //   }
  //   this.rqwMaterialAssayService.onReject(body).subscribe((data: any) => {
  //     if (data.errorInfo != null) {
  //       this.dialog.open(MessageDialogComponent, {
  //         data: {
  //           message: data.errorInfo.message,
  //           heading: 'Error Information',
  //         },
  //       });
  //     } else {
  //       this.messageService.sendSnackbar(
  //         'success',
  //         'Record updated successfully'
  //       );
  //     }
  //     this.isLoading = false;
  //   });
  // }
  createLineChart(lcroles: any, counts: any) {
    if (this.isPieChartDataAvailable) {
      this.linechartOptions = {
        series: [
          {
            name: 'No of pending assignment',
            // data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            data: counts,
          },
        ],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'Product Trends by Stage',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: lcroles,
          // categories: [
          //   "Jan",
          //   "Feb",
          //   "Mar",
          //   "Apr",
          //   "May",
          //   "Jun",
          //   "Jul",
          //   "Aug",
          //   "Sep"
          // ]
        },
      };
    }
  }

  // public cancel() {
  //   this.excelHelperService.cancel();
  // }

  public downloadmrsles() {

    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'mrsles.html';
    const qtNo = this.headerData?.uc0001;
    const moduleCode = this.headerData?.modulecode;
    const lc0003 = this.headerData?.lc0003;
    this.isLoading = true;
    this.rqwMaterialAssayService
      .downloadmrsles(lcRequestNumber, lcNumber, templateName, qtNo, moduleCode, lc0003)
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
        link.download = qtNo + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
  public downloadmrslea() {
    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'mrslea.html';
    const qtNo = this.headerData?.uc0001;
    const moduleCode = this.headerData?.modulecode;
    const stage = this.headerData?.stage;
    const userid = this.headerData.createdBy;
    const lc0003 = this.headerData?.lc0003;
    this.isLoading = true;
    this.rqwMaterialAssayService
      .downloadmrslea(
        lcRequestNumber,
        lcNumber,
        templateName,
        qtNo,
        stage,
        userid,
        moduleCode,
        lc0003
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
        link.download = qtNo + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
  uc0001: any;
  public downloadmrsle() {
    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'mrsle.html';
    const qtNo = this.headerData?.uc0001;
    const moduleCode = this.headerData?.modulecode;
    const lc0003 = this.headerData?.lc0003;
    this.isLoading = true;
    this.rqwMaterialAssayService
      .downloadmrsle(lcRequestNumber, lcNumber, templateName, qtNo, moduleCode, lc0003)
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
        link.download = qtNo + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}

