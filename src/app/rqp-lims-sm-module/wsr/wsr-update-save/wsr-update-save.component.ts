import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
// import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api-service/api.service';
import { WsrService } from '../wsr.service';

@Component({
    selector: 'app-wsr-update-save',
    templateUrl: './wsr-update-save.component.html',
    styleUrls: ['./wsr-update-save.component.scss'],
    standalone: false
})
export class WsrUpdateSaveComponent {
  public editorDisabled = false;
  public pageData: any;
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
    public dialog: MatDialog,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form= this.wsrService.form;
    this.commentForm = this.wsrService.commentForm;
    this.productInformation = this.wsrService.productInformation;
  }

  ngOnInit() {
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
    };

    this.activatedRoute.queryParamMap.subscribe((data: any) => {
      this.pageData = {
        pageName: 'qt-review',
        pageType: 'update',
        requestNo: data.params.uc0001,
        version:
          data.params.ff0007 +
          '.' +
          data.params.ff0008 +
          '.' +
          data.params.ff0009 +
          '.' +
          data.params.ff0010,
        comments: data.params.comments,
      };

      this.apiService
        .getModuleRequestNo(data.params.uc0001, data.params.ff0001)
        .subscribe(({ data }) => {
          this.apiService.update(data[0].uc0001).subscribe((data) => {
            const binaryData = atob(data.data);
            this.form.get('html').patchValue(binaryData);
          });
        });
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

  public onContentChange(content: any) {
    this.form.get('html').setValue(content);
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
}
