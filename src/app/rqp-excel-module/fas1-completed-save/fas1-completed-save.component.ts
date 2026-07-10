import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, forkJoin, takeUntil, timer } from 'rxjs';
import { MessageService } from 'src/app/service/message.service';
import { RqwMaterialAssayService } from '../service/rqw-material-assay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { NotificationService } from 'src/app/common/notification.service';

interface Row {
  files: File[];
}
@Component({
  selector: 'app-fas1-completed-save',
  templateUrl: './fas1-completed-save.component.html',
  styleUrls: ['./fas1-completed-save.component.scss'],
  standalone: false,
})
export class Fas1CompletedSaveComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public ViewDetailForm: FormGroup;
  public headerData: any;
  public pageData: any;
  public assay: number;
  public lc0003: string;
  public ff0001: any;
  public userCurrentComments: any;
  commentType = 'completedRecord';
  public ff0005: number;
  public dataSource: any;
  public reviewCommentsData: any;
  public displayedColumns: any;
  public nextStageListData: any;
  private destroy$ = new Subject<void>();
  public selectedDialogData: any;
  public downloadApi: any;
  public assayValue: any;
  uc0001: any;


  public resviewCommentsDisplayColumn: string[] = [
    'createdby',
    'ff0003',
    'ff0005',
    'comments',
  ];
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    // nextStage: new FormControl(''),
  });
  public percentage: number;
  public isLoading = false;
  private $destroy = new Subject();
  public numbers = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
    {
      number: 4,
    },
    {
      number: 5,
    },
  ];

  public productInformation = new FormGroup({
    productName: new FormControl(''),
    protocolNo: new FormControl(''),
    sampleDes: new FormControl(''),
    testParameter: new FormControl(''),
    analystName: new FormControl(''),
    batchNo: new FormControl(''),
    arNo: new FormControl(''),
  });
  public aveargeCalculate = new FormGroup({
    averageAssay: new FormControl(''),
    averageContent: new FormControl(''),
    // averageAnhydrousAndSolvent: new FormControl(''),
  });

  public assayCalculationForm = new FormGroup({
    molecularWeightOne: new FormControl(),
    molecularWeightTwo: new FormControl(),
    standardAvgArea: new FormControl(),
    labelClaim: new FormControl(),
    standardPurity: new FormControl(),
  });

  public standardDilutionForm = new FormGroup({
    mgToOne: new FormControl(),
    mlOne: new FormControl(),
    mlToTwo: new FormControl(),
    mlTwo: new FormControl(),
    mlToThree: new FormControl(),
    mlThree: new FormControl(),
    mlToFour: new FormControl(),
    mlFour: new FormControl(),
    mlToFive: new FormControl(),
    mlFive: new FormControl(),
    mlToSix: new FormControl(),
    mlSix: new FormControl(),
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
    dropdownForAssy: new FormControl(),
    dropdownForContent: new FormControl(),
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private rqwMaterialAssayService: RqwMaterialAssayService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.ViewDetailForm = this.fb.group({
      orgUnitCode: ['', Validators.required],
      salesUnitCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe((params: any) => {
     const completedData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (completedData) {
      params = JSON.parse(completedData);
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
            this.downloadApi = data[0].data[0];
            this.assayValue = this.downloadApi.lc0003;
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
              dropdownForAssy: +common.ff0029,
              dropdownForContent: +common.ff0030,
              // dropdownForContent: +common.ff0031,
            });

            this.aveargeCalculate.setValue({
              averageAssay: common.ff0032,
              averageContent: common.ff0033,
              //averageAnhydrousAndSolvent: common.ff0034,
            });

            this.productInformation.setValue({
              productName: common.ff0060,
              protocolNo: common.ff0061,
              sampleDes: common.ff0062,
              testParameter: common.ff0063,
              analystName: common.ff0064,
              batchNo: common.ff0065,
              arNo: common.ff0066,
            });

            for (let i = 1; i < asi.length; i++) {
              this.getFormArray().push(this.fields());
            }

            asi.forEach((element, i: number) => {
              this.getFormArray().at(i).setValue({
                sampleDetails: element.ff0001,
                spiArea: element.ff0002,
                avgWt: element.ff0003,
                splWt: element.ff0004,
                assayInMg: element.ff0005,
                perContent: element.ff0006,
                // anhydrousBasis: element.ff0007,
                // ashydrousAndSolventFreeBasis: element.ff0008,
              });
            });
          });
        });

      this.forms();
    // });
      }
  }

  ngAfterViewInit(): void {
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
  public onReviewData(): void {
    this.rqwMaterialAssayService
      .onCommentsData(this.ff0001, this.headerData.lcnum, this.ff0005)
      .subscribe((data: any) => {
        this.reviewCommentsData = data.data;
        this.dataSource = new MatTableDataSource(this.reviewCommentsData);
        //this.dataSource.sort=this.sort;
      });
  }
  public getCommentsData(event: any): void {
    this.userCurrentComments = event;
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
  public getFormArray(): FormArray {
    return this.sampleInformation.get('sampleInfo') as FormArray;
  }

  private fields(): FormGroup {
    return this.fb.group({
      sampleDetails: new FormControl(),
      spiArea: new FormControl(),
      avgWt: new FormControl(),
      splWt: new FormControl(),
      assayInMg: new FormControl(),
      perContent: new FormControl(),
      // anhydrousBasis: new FormControl(),
      // ashydrousAndSolventFreeBasis: new FormControl(),
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
    this.onReviewData();
  }

  private forms() {
    let totalAssay: number;
    let totalCotent: number;
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
      ff0040: +this.aveargeCalculate.value.averageAssay,
      ff0041: +this.aveargeCalculate.value.averageContent,
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
      comments: this.userCurrentComments,
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
        unitcode: '',
        createdby: '',
        status: 0,
        comments: this.userCurrentComments,
      };
      rasiList.push(Object.assign(data, formArrayData));
    }

    const lcRequest = {
      unitCode: this.headerData.unitcode,
      moduleCode: this.headerData.modulecode,
      departmentCode: this.headerData.departmentcode,
      //lcrqNumber: this.headerData.requestNo,
      lcNumber: this.headerData.lcnum,
      lcStage: this.headerData.stage,
      lcRole: this.headerData.role,
      stage2: this.headerData.stage,
      createdBy: this.headerData.createdby,
      comments: this.userCurrentComments,
      documentModule: '',
      documentStatus: '',
      draft: draft,
    };

    let sendValue = {
      lcRequest: lcRequest,
      commonDtoList: records,
      as1DtoList: rasiList,
    };

    console.log(sendValue);

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
          // this.messageService.sendSnackbar(
          //   'success',
          //   '"RAS1 info Record inserted successfully'
          // );
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });

          timer(2000)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.router.navigateByUrl('/excel/fas1-home');
            });
        }
      });
  }
  public downloadfas1s() {
    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'fas1s.html';
    const qtNo = this.headerData?.requestNo;
    const moduleCode = this.headerData?.modulecode;
    const lc0003 = this.assayValue;
    this.isLoading = true;
    this.rqwMaterialAssayService
      .downloadfas1s(
        lcRequestNumber,
        lcNumber,
        templateName,
        qtNo,
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
  public downloadfas1a() {
    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'fas1a.html';
    const qtNo = this.headerData?.requestNo;
    const moduleCode = this.headerData?.modulecode;
    const stage = this.headerData?.stage;
    const userid = this.headerData?.createdby;
    const lc0003 = this.assayValue;
    this.isLoading = true;
    console.log(stage);
    this.rqwMaterialAssayService
      .downloadfas1a(
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
  public downloadfas1() {
    const lcRequestNumber = this.headerData?.requestNo;
    const lcNumber = this.headerData?.lcnum;
    const templateName = 'fas1.html';
    const qtNo = this.headerData?.requestNo;
    const moduleCode = this.headerData?.modulecode;
    const lc0003 = this.assayValue;
    this.isLoading = true;
    this.rqwMaterialAssayService
      .downloadfas1(
        lcRequestNumber,
        lcNumber,
        templateName,
        qtNo,
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

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
