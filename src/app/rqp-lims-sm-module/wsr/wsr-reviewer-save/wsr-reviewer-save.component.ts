import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
// import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ApiService } from 'src/app/service/api-service/api.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { WsrService } from 'src/app/service/wsr.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-wsr-reviewer-save',
  templateUrl: './wsr-reviewer-save.component.html',
  styleUrls: ['./wsr-reviewer-save.component.scss'],
  standalone: false
})
export class WsrReviewerSaveComponent {
  public redirectUrl: string = '/rqplabui/lims-sm/wsr-module-home-page';
  public editorDisabled = false;
  public pageData: any;
  public comments: string;
  UserRequirementForm: FormGroup;
  public userCurrentComments: any;
  // public Editor = ClassicEditor;
  // public config: SummernoteOptions = this.wsrService.config;
  public form: FormGroup;
  public commentForm: FormGroup;
  public headerData: any;
  public productInformation: FormGroup;
  public getHeaderData(event: any) {
    return (this.headerData = this.wsrService.getHeaderData(event));
  }

  constructor(
    private wsrService: WsrService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { 
     this.form= this.wsrService.form;
    this.commentForm = this.wsrService.commentForm;
    this.productInformation = this.wsrService.productInformation;
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
    this.attachmentPDF(params);

      this.apiService
        .getModuleRequestNo(params.uc0001, params.ff0001)
        .subscribe(({ data }) => {
          this.apiService.update(data[0].uc0001).subscribe((data) => {
            const binaryData = atob(data.data);
            this.form.get('html').patchValue(binaryData);
          });
        });
      // });
    }
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
  onButtonClicked(event: { buttonName: string; success: boolean }) {
    console.log('Button: ${event.buttonName}, Success: ${event.success}');
    if (event.success && event.buttonName == 'Return') {
    }
    if (event.success && event.buttonName == 'Submit') {
    }
    if (event.success && event.buttonName == 'Comments') {
    }
    if (event.success && event.buttonName == 'Clear') {
    }
  }
  buttonConfig = [
    { label: 'Return', getPayload: () => this.calculateReturnPayload() },
    { label: 'Submit', getPayload: () => this.calculateReturnPayload() },
    { label: 'Clear', getPayload: () => this.calculateReturnPayload() },
    { label: 'Comments', getPayload: () => this.calculateCommentsPayload() },
    // Add more buttons as needed
  ];
  calculateReturnPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      commentsFieldData: this.comments,
      pageData: this.pageData,
    };
  }

  calculateCommentsPayload() {
    return {
      data: 'returnData',
      calculatedValue: this.headerData,
      lcRequestnumber: this.headerData.requestNo,
      lcnum: this.headerData.lcnum,
      templateName: 'ch.html',
      stage: this.headerData.stage,
      userid: this.headerData.createdby,
      moduleCode: this.headerData.modulecode,
    };
  }

  public onSubmit(draft: boolean) {
    if (this.form.value.html) {
      const {
        productName,
        productNo,
        sampleDes,
        testParameter,
        analystName,
        batchNo,
        arNo,
        stp,
      } = this.productInformation.value;
      // Create a Blob directly from the HTML content
      const inputValues: any = this.wsrService.getInputFieldValues();
      const blob = new Blob([this.form.value.html], { type: 'text/html' });

      // Create a FormData object
      const formData = new FormData();
      formData.append('htmlAttachments', blob, 'document.html'); // Append the Blob as a file

      const data = {
        lcRequest: {
          unitCode: this.headerData.unitcode,
          moduleCode: this.headerData.modulecode,
          departmentCode: this.headerData.departmentcode,
          lcrqNumber: '',
          lcNumber: this.headerData.lcnum,
          lcStage: this.headerData.stage,
          lcRole: this.headerData.role,
          stage2: this.headerData.stage,
          createdBy: this.headerData.createdby,
          comments: this.commentForm.value.comments,
          documentModule: '',
          documentStatus: '',
          draft: draft,
        },
        wsMasterDto: {
          uc0001: this.pageData.requestNo,
          ff0001: this.headerData.unitcode,
          ff0002: this.headerData.departmentcode,
          ff0003: this.headerData.modulecode,
          ff0004: '',
          ff0005: analystName,
          ff0006: '',
          ff0007: '',
          ff0008: '',
          ff0009: '',
          ff0010: '',
          ff0011: '',
          ff0012: '',
          lc0001: '',
          lc0002: '',
          lc0003: '',
          lc0004: '',
          lc0005: '',
          lc0006: '',
          createdby: this.headerData.createdby,
          status: 0,
          comments: this.commentForm.value.comments,
          unitcode: '',
        },
        attachmentDto: {
          uc0001: this.pageData.requestNo,
          ff0001: '',
          ff0005: '',
          ff0013: '',
          lc0002: '',
          lc0003: '',
          lc0004: '',
          documentAction: 'CREATE',
        },
      };

      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      formData.append('wsTestAttachDTO', jsonBlob, 'data.json');

      // Call the API service
      this.apiService.saveAndUpdate(formData).subscribe((result) => {
        if (result.errorInfo) {
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: result.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.messageService.sendSnackbar(
            'success',
            '"WSR info Record inserted successfully'
          );
        }
      });
    } else {
      this.messageService.sendSnackbar(
        'error',
        'Please add some content in word editor'
      );
    }
  }
    public pdfSrc: string = '';
  public showPdfPreview: boolean = false;
  public htmlPreviewContent: SafeHtml = '';
  public attachmentPDF(value:any){
    let lc0002 = value.uc0001;
    let param = {lc0002}
    this.apiService.sendRequest(apiEndPoints.attachmentPDF,'POST', param).subscribe((data:any) => {
      console.log(data)
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
}
