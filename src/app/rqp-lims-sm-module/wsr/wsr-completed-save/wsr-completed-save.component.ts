import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WsrService } from '../wsr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiService } from 'src/app/service/api-service/api.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { DmsService } from 'src/app/service/dms.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';

@Component({
  selector: 'app-wsr-completed-save',
  standalone: false,
  templateUrl: './wsr-completed-save.component.html',
  styleUrl: './wsr-completed-save.component.scss'
})
export class WsrCompletedSaveComponent {
 public redirectUrl: string = '/rqplabui/lims-sm/wsr-module-home-page';
  public editorDisabled = false;
   commentType = 'completedRecord';
  public pageData: any;
  public comments: string;
  UserRequirementForm: FormGroup;
  public userCurrentComments: any;
   public ff0005: number;
  // public Editor = ClassicEditor;
  // public config: SummernoteOptions = this.wsrService.config;
  public form: FormGroup;
  public commentForm: FormGroup;
  public headerData: any;
  isLoading = false;
  public lc0003:any;
  public wsMasterListData:any;
  public wsMasterListTableData:any;
    selectedDialogData: any;
  public productInformation: FormGroup;
  HeaderForm: FormGroup;
  public pmsList = new FormGroup({
    productNo: new FormControl(''),
  });
  public getHeaderData(event: any) {
    return (this.headerData = this.wsrService.getHeaderData(event));
  }

  constructor(
    private wsrService: WsrService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
     private dmsService: DmsService,
     private remoteLoader: RemoteComponentLoaderService,
      private route: Router,
  ) {
    this.form = this.wsrService.form;
    this.commentForm = this.wsrService.commentForm;
    this.productInformation = this.wsrService.productInformation;
    this.HeaderForm = this.fb.group({
      productName: [''],
      market: [''],
      productCode: [''],
      uom: [''],
      shelfLifeMonths: [''],
      productType: [''],
      dosageForm: [''],
      inputCode: [''],
      productTrackingCode: [''],
      record: [''],
    });
  }

  ngOnInit() {
    // this.activatedRoute.queryParamMap.subscribe((data: any) => {
    const reviewData = sessionStorage.getItem('selectedRow');
    let params: any = null;
    if (reviewData) {
      params = JSON.parse(reviewData);
      this.pageData = {
        pageName: 'qtUpdateDetail',
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
      this.ff0005 = params.ff0008;
      this.attachmentPDF(params);

      this.apiService
        .getWSModuleRequestNo(params.uc0001, params.ff0001)
        .subscribe(({ data }) => {
          console.log(data)
this.lc0003 = data[0].lc0003;
          this.apiService.update(data[0].uc0001).subscribe((data) => {
            const binaryData = atob(data.data);
            this.form.get('html').patchValue(binaryData);
          });
         if(this.lc0003){
 this.onLoadWsMasterList();
    this.onLoadWsTFieldsList();
         }
        });
      // });
    }
   
  }
  public onLoadWsMasterList() {
    this.apiService
      .wsMasterList(this.lc0003)
      .subscribe(({ data }) => {
        console.log(data)
        this.wsMasterListData = data;
        console.log(this.wsMasterListData)
         this.wsMasterListData.forEach((element) => {
              this.HeaderForm.patchValue({
                productName: element.ff0001,
                market: element.ff0002,
                productCode: element.ff0003,
                uom: element.ff0004,
                shelfLifeMonths: element.ff0005,
                productType: element.ff0006,
                dosageForm: element.ff0007,
                inputCode: element.ff0008,
                productTrackingCode: element.ff0009,
                record: element.ff0011
              });
              this.pmsList.patchValue({
                productNo:element.ff0010
              });
            });       
            });
  }
   public onLoadWsTFieldsList() {
    this.apiService
      .WsTFieldsList(this.lc0003)
      .subscribe(({ data }) => {
        console.log(data)
      });
  }
  public getFormInputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }

  public addInputFieldControl(uniqueId: string) {
    this.wsrService.addInputFieldControl(uniqueId);
  }

  public getInputFieldValues() {
    return this.wsrService.getInputFieldValues();
  }

  private removeInputFieldControl(index: number) {
    const inputs = this.form.get('inputs') as FormArray;
    inputs.removeAt(index);
  }

  public enableEditor() {
    this.editorDisabled = false;
  }

  public disableEditor() {
    this.editorDisabled = true;
  }

  public onBlur() {
    // console.log('Blur');
  }

  public onDelete(file) {
    // console.log('Delete file', file.url);
  }

  public summernoteInit(event) {
    console.log(event);
  }
  nextStageListData: any;
  dataSource: any;
  reviewCommentsData: any;
  public handleCommentsForm(event: any) {
    this.comments = event.comments;
  }
 

  public pdfSrc: string = '';
  public showPdfPreview: boolean = false;
  public htmlPreviewContent: SafeHtml = '';
  public attachmentPDF(value: any) {
    let lc0002 = value.uc0001;
    let param = { lc0002 }
    this.apiService.sendRequest(apiEndPoints.attachmentHTML, 'POST', param).subscribe((data: any) => {
      if (data?.data) {
        this.showPdfPreview = false;
        // Decode base64 HTML string
        try {
          const decodedHtml = atob(data.data);
          this.htmlPreviewContent = this.sanitizer.bypassSecurityTrustHtml(decodedHtml);
        } catch (e) {
          this.htmlPreviewContent = '<div style="color:red">Failed to decode HTML content.</div>';
        }
      }
    });
  }
   public getCommentsData(event: any): void {
    this.userCurrentComments = event;
  }
  async onSaveConfirmation() {
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
          this.getDocumentRivision();
        }
      }
    });
  }
  getDocumentRivision() {
    const data = {
      uc0001: null,
      ff0001: this.headerData.requestNo,
      ff0002: this.headerData.lcnum,
      ff0003: this.headerData.role,
      ff0004: this.headerData.requestNo,
      ff0005: this.pageData.version.slice(0, 1),
      ff0006: this.pageData.version.slice(2, 3),
      ff0007: this.pageData.version.slice(4, 5),
      ff0008: this.pageData.version.slice(6, 7),
      ff0009: this.headerData.requestNo,
      createdby: this.headerData.createdby,
      comments: this.userCurrentComments,
    };
    this.dmsService.documentRivision(data).subscribe({
      next: (data) => {},
      complete: () => {
        this.route.navigate(['/dms/sop-module-home-page']);
      },
      error: (err) => console.log(err),
    });
  }
   getComments() {
    const lcRequestnumber = this.headerData.requestNo;
    const lcnum = this.headerData.lcnum;
    const templateName = 'ch.html';
    const stage = 1;
    const userid = this.headerData.createdby;
    const moduleCode = this.headerData.modulecode;
    this.dmsService
      .onGetCommentsData(
        lcRequestnumber,
        lcnum,
        templateName,
        stage,
        userid,
        moduleCode
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
        link.download = lcRequestnumber + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
    this.isLoading = false;
  }
}

