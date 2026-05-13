import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { NgZone } from '@angular/core'; // Import NgZone
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { DropdownList } from '../models/wsr.model';
import { DmsService } from 'src/app/service/dms.service';
import { WsrService } from 'src/app/service/wsr.service';
import { PmsListComponent } from 'src/app/rqp-lims-module/pms-list/pms-list.component';
import { ApiService } from 'src/app/service/api.service';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $: any;

@Component({
  selector: 'app-wsr-initiator',
  templateUrl: './wsr-initiator.component.html',
  styleUrls: ['./wsr-initiator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class WsrInitiatorComponent implements OnInit, AfterViewInit {
  // --- Word Editor logic ---
  @ViewChild('wordEditor') wordEditor!: ElementRef;

  wordText: string = '';
  wordHtml: string = '';
  wordEditorHtml: string = '';  // stores final HTML for API
  newAttributesAdded: { [key: string]: { unitCode: string; min: number; max: number } } = {};
  private _doubleClickCount: number = 0;
  wordCursorPosition: number = 0;
  wordFields: any = {};
  parsedWordTemplate: string[] = [];
  showWordPreview: boolean = false;
  showWordFieldPopup: boolean = false;
  showWordConfigPopup: boolean = false;
  showTableDialog: boolean = false;
  popupX: number = 0;
  popupY: number = 0;
  currentWordField: string = '';
  wordFieldList: string[] = ['temperature', 'phValue', 'waterQty']; // Add more as needed
  wordPreviewForm: FormGroup = new FormGroup({});
  previewHtml: SafeHtml = '';

  saveRange(): void {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const el = this.wordEditor?.nativeElement as HTMLElement;
      if (el && el.contains(range.commonAncestorContainer)) {
        this._savedRange = range.cloneRange();
      }
    }
  }

  onWordEditorClick(event: any) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      this._savedRange = sel.getRangeAt(0).cloneRange();
    }
  }

  private _savedRange: Range | null = null;

  onEditorInput(event: any) {
    this.wordHtml = event.target.innerHTML;
    this.wordText = event.target.innerText;
    this.syncWordTemplate();
  }

  onWordEditorDoubleClick(event: MouseEvent) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      this._savedRange = sel.getRangeAt(0).cloneRange();
    }
    this.openWordEditorLOV();
  }

  openWordEditorLOV(): void {
    if (!this.dropdownList || this.dropdownList.length === 0) {
      this.messageService.sendSnackbar('error', 'Please select a header record first');
      return;
    }
    const displayedColumns = [
      { field: 'fiunitcode', title: 'Unit Code' },
      { field: 'fiunitname', title: 'Unit Name' },
      { field: 'fitype', title: 'Type' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Organization List',
        dialogColumns: displayedColumns,
        dialogData: this.dropdownList,
        lovName: 'organizationList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.currentWordField = result.data.fiunitcode;
        this.showWordConfigPopup = true;
      }
    });
  }

  selectWordField(field: string) {
    this.currentWordField = field;
    this.showWordFieldPopup = false;
    this.showWordConfigPopup = true;
  }

  saveWordFieldConfig(min: any, max: any) {
    const minNum = Number(min);
    const maxNum = Number(max);

    if (Number.isNaN(minNum) || Number.isNaN(maxNum)) {
      this.messageService.sendSnackbar('error', 'Please enter valid min and max values');
      return;
    }

    const placeholder = `{{${this.currentWordField}}}`;
    const el = this.wordEditor?.nativeElement as HTMLElement;

    if (el && this._savedRange) {
      el.focus();
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(this._savedRange);
      document.execCommand('insertText', false, placeholder);
      this.wordHtml = el.innerHTML;
      this.wordText = el.innerText;
    }

    this._doubleClickCount++;
    const key = `${this._doubleClickCount}_double_click`;
    this.newAttributesAdded[key] = {
      unitCode: this.currentWordField,
      min: minNum,
      max: maxNum
    };
    this.wordFields[this.currentWordField] = { min: minNum, max: maxNum };
    this.showWordConfigPopup = false;
    this.syncWordTemplate();
  }

  saveWordTemplate() {
    if (!this.wordText.trim()) {
      this.messageService.sendSnackbar('error', 'Please add content in Word Editor');
      return;
    }
    this.wordHtml = this.wordEditor?.nativeElement?.innerHTML || this.wordHtml;
    this.wordText = this.wordEditor?.nativeElement?.innerText || this.wordText;
    this.syncWordTemplate();
    this.messageService.sendSnackbar('success', 'Word template saved');
  }

  previewWordTemplate() {
    if (!this.wordText.trim()) {
      this.messageService.sendSnackbar('error', 'Please add content in Word Editor');
      return;
    }
    this.wordHtml = this.wordEditor?.nativeElement?.innerHTML || this.wordHtml;
    this.wordText = this.wordEditor?.nativeElement?.innerText || this.wordText;
    this.syncWordTemplate();
    this.showWordPreview = true;
  }

  parseWordTemplate() {
    this.parsedWordTemplate = this.wordText
      .split(/(\{\{.*?\}\})/g)
      .filter((part) => part !== '');
  }

  isWordField(part: string): boolean {
    return part.startsWith('{{') && part.endsWith('}}');
  }

  getWordFieldName(part: string): string {
    return part.replace('{{', '').replace('}}', '').trim();
  }

  buildWordPreviewForm() {
    const controls: { [key: string]: FormControl } = {};

    Object.keys(this.wordFields).forEach((fieldName) => {
      const fieldConfig = this.wordFields[fieldName];
      controls[fieldName] = new FormControl('', [
        Validators.min(fieldConfig.min),
        Validators.max(fieldConfig.max),
      ]);
    });

    this.wordPreviewForm = new FormGroup(controls);
  }

  validateWordField(fieldName: string) {
    const control = this.wordPreviewForm.get(fieldName);
    const fieldConfig = this.wordFields[fieldName];

    if (!control || !fieldConfig || control.value === '' || control.value === null) {
      return;
    }

    if (control.value < fieldConfig.min) {
      this.messageService.sendSnackbar(
        'error',
        `${fieldName} should not be less than ${fieldConfig.min}`
      );
    }

    if (control.value > fieldConfig.max) {
      this.messageService.sendSnackbar(
        'error',
        `${fieldName} should not be greater than ${fieldConfig.max}`
      );
    }
  }

  private syncWordTemplate() {
    this.wordEditorHtml = this.wordHtml;
    this.form.get('html')?.setValue(this.wordHtml);
    this.parseWordTemplate();
    this.buildWordPreviewForm();
    this.buildPreviewHtml();
  }

  buildRawPreviewHtml(): string {
    let html = this.wordHtml;
    Object.keys(this.wordFields).forEach(field => {
      const cfg = this.wordFields[field];
      const input = `<input type="number" placeholder="${field} (${cfg.min}-${cfg.max})" min="${cfg.min}" max="${cfg.max}" style="width:140px;padding:4px 8px;border:1px solid #ceb98d;border-radius:6px;" /><small style="color:#8a6a2d;">(${cfg.min} - ${cfg.max})</small>`;
      html = html.replace(new RegExp(`\\{\\{${field}\\}\\}`, 'g'), input);
    });
    html = html.replace(/\{\{([^}]+)\}\}/g, (_, name) => {
      return `<input type="text" placeholder="${name}" style="width:140px;padding:4px 8px;border:1px solid #ceb98d;border-radius:6px;" />`;
    });
    return `<!DOCTYPE html><html><head><style>
      body { font-family: Arial, sans-serif; padding: 16px; }
      table { border-collapse: collapse; width: 100%; margin: 12px 0; }
      th { background: linear-gradient(135deg,#1a73e8,#1558b0); color:#fff; padding:10px 14px; text-align:left; border:1px solid #1558b0; }
      td { padding:9px 14px; border:1px solid #dde3f0; }
      tr:nth-child(even) td { background:#f4f7fd; }
    </style></head><body>${html}</body></html>`;
  }

  private buildPreviewHtml() {
    let html = this.wordHtml;
    // replace configured fields with validated inputs
    Object.keys(this.wordFields).forEach(field => {
      const cfg = this.wordFields[field];
      const input = `<input type="number" class="word-preview-inline-input"
        placeholder="${field} (${cfg.min}-${cfg.max})"
        min="${cfg.min}" max="${cfg.max}"
        oninput="this.style.borderColor = (this.value < ${cfg.min} || this.value > ${cfg.max}) ? 'red' : '#ceb98d'"
        style="width:140px;padding:4px 8px;border:1px solid #ceb98d;border-radius:6px;" />
        <small style="color:#8a6a2d;">(${cfg.min} - ${cfg.max})</small>`;
      html = html.replace(new RegExp(`\\{\\{${field}\\}\\}`, 'g'), input);
    });
    // replace any remaining {{anything}} with a plain text input
    html = html.replace(/\{\{([^}]+)\}\}/g, (_, name) => {
      return `<input type="text" class="word-preview-inline-input"
        placeholder="${name}"
        style="width:140px;padding:4px 8px;border:1px solid #ceb98d;border-radius:6px;" />`;
    });
    this.previewHtml = this.sanitizer.bypassSecurityTrustHtml(html);
  }
  public pageData: any; 
  nextStageListData: any;
  public content: any;
  public headerData: any;   
  public dropdownList: DropdownList[];
  public selectedDialogData: any[] = [];
  public selectedDialogValue: any;
  public selectedData: any[] = [];
  public psmList: any[] = [];
  public storeHtml = [];
  public displayedColumns: any;
  public isSubjectCodeSuccess: boolean;
  HeaderForm: FormGroup;
  public commentForm:FormGroup;
  public productInformation:FormGroup;
  public pmsList = new FormGroup({
    productNo: new FormControl(''),
  });
  // public Editor = ClassicEditor;
  // public editorConfig = {
  //   toolbar: {
  //     items: [
  //       'heading', '|',
  //       'bold', 'italic', 'underline', 'strikethrough', '|',
  //       'bulletedList', 'numberedList', '|',
  //       'outdent', 'indent', '|',
  //       'insertTable', '|',
  //       'link', 'blockQuote', '|',
  //       'undo', 'redo'
  //     ]
  //   },
  //   table: {
  //     contentToolbar: [
  //       'tableColumn', 'tableRow', 'mergeTableCells',
  //       'tableProperties', 'tableCellProperties'
  //     ]
  //   }
  // };

  form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required)
  });
  constructor(
    private wsrService: WsrService,
    private apiService: ApiService,
    private cookieService: CookieService,
    private dmsService: DmsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private messageService: MessageService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private zone: NgZone
  ) {
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
    // this.config = this.wsrService.config;
    this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
    };
    this.generateHtml(); // Call to dynamically generate the HTML
  }

  ngAfterViewInit() {
    if (this.wordEditor?.nativeElement) {
      this.wordEditor.nativeElement.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const html = e.clipboardData?.getData('text/html');
        const plain = e.clipboardData?.getData('text/plain');

        if (html && html.includes('<table')) {
          document.execCommand('insertHTML', false, this.sanitizePastedHtml(html));
        } else {
          document.execCommand('insertText', false, plain || '');
        }
        this.wordText = this.wordEditor.nativeElement.innerHTML;
        this.syncWordTemplate();
      });
    }
  }

  sanitizePastedHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // Keep tables with basic styles, strip scripts
    doc.querySelectorAll('script, style').forEach(el => el.remove());
    doc.querySelectorAll('table').forEach(table => {
      table.setAttribute('border', '1');
      table.setAttribute('style', 'border-collapse:collapse;width:100%;margin:8px 0;');
    });
    doc.querySelectorAll('td, th').forEach(cell => {
      cell.setAttribute('style', 'border:1px solid #999;padding:6px 10px;');
    });
    return doc.body.innerHTML;
  }

  insertTable(rows: number, cols: number): void {
    let tableHtml = `<table style="border-collapse:collapse;width:100%;margin:12px 0;box-shadow:0 2px 8px rgba(0,0,0,0.08);">`;

    // header row
    tableHtml += '<tr>';
    for (let c = 0; c < cols; c++) {
      tableHtml += `<th style="background:linear-gradient(135deg,#1a73e8,#1558b0);color:#fff;font-weight:600;font-size:13px;padding:10px 14px;text-align:left;border:1px solid #1558b0;min-width:100px;">Header ${c + 1}</th>`;
    }
    tableHtml += '</tr>';

    // data rows
    for (let r = 0; r < rows; r++) {
      const bg = r % 2 === 0 ? '#fff' : '#f4f7fd';
      tableHtml += '<tr>';
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td style="padding:9px 14px;font-size:13px;border:1px solid #dde3f0;color:#333;background:${bg};min-width:100px;">&nbsp;</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table><p><br></p>';

    const el = this.wordEditor?.nativeElement as HTMLElement;
    if (el) {
      el.focus();
      // restore saved cursor position before inserting
      if (this._savedRange) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(this._savedRange);
      }
      document.execCommand('insertHTML', false, tableHtml);
      this.wordHtml = el.innerHTML;
      this.wordText = el.innerText;
      this.syncWordTemplate();
    }
  }

  convertMixedHtmlToText(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;
    let result = '';

    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        if (text.trim()) result += text;
      } else if (node.nodeName === 'TABLE') {
        const rows = (node as Element).querySelectorAll('tr');
        rows.forEach(row => {
          const cells = row.querySelectorAll('td, th');
          const cellTexts = Array.from(cells).map(c => c.textContent?.trim() || '');
          result += cellTexts.join('\t') + '\n';
        });
        result += '\n';
      } else if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(node.nodeName)) {
        const el = node as Element;
        // skip if contains a table — table children handled separately
        if (!el.querySelector('table')) {
          const text = el.textContent?.trim() || '';
          if (text) result += text + '\n';
        } else {
          node.childNodes.forEach(processNode);
        }
      } else if (node.nodeName === 'BR') {
        result += '\n';
      } else {
        node.childNodes.forEach(processNode);
      }
    };

    body.childNodes.forEach(processNode);
    return result.trim();
  }

  generateHtml() {
    for (let i = 0; i < this.selectedDialogData.length; i++) {
      const uniqueId = 'select-field-' + Date.now();

      const div = this.renderer.createElement('div');
      const input = this.renderer.createElement('input');

      this.renderer.setAttribute(input, 'type', 'button');
      this.renderer.setAttribute(input, 'id', uniqueId);
      this.renderer.setAttribute(input, 'class', 'btn btn-primary');
      this.renderer.setStyle(input, 'color', 'red');
      this.renderer.setProperty(input, 'value', this.selectedDialogData[i]);

      // Use an arrow function to ensure the correct context of 'this'
      this.renderer.listen(input, 'click', () => {
        console.log('Button clicked:', uniqueId); // Debug log to confirm click event
        this.openDialog(); // This should now print 'like'
      });

      this.renderer.appendChild(div, input);
      this.renderer.appendChild(document.body, div); // Append to the body or a specific container
    }
  }

  // openDialog() {
  //   this.dialog.open(LovDialogComponent, {
  //     width: '250px',
  //     data: { message: 'Your dialog data here' }
  //   });
  // }

  public getHeaderData(event: any) {
    this.apiService.getInput(this.cookieService.get('buCode')).subscribe(({ data }) => {
      this.dropdownList = data.fiUnitList;
      console.log(data);
    });
    this.dmsService.bmrInput(event.unitcode).subscribe(({ data }) => {
      console.log(data);
      this.psmList = data.pmsList;
    });
    return (this.headerData = this.wsrService.getHeaderData(event));
  }

  saveAndUpdate(draft: boolean) {
    if (this.form.valid) {
      const data = {
        // Add logic here for saving form data
        headerData: {
          stage: this.headerData.stage,
          createdBy: this.headerData.createdby,
          comments: this.commentForm.value.comments,
          // Add other fields as necessary
        },
        wsMasterDto: {
          // Example form data submission
        },
        attachmentDto: {
          // Example attachment data
        },
      };

      const jsonBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });
      const formData = new FormData();
      formData.append('wsTestAttachDTO', jsonBlob, 'data.json');

      // Call the API service to save data
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
  public onContentChange(content: any) {
    this.form.get('html').setValue(content);
  }
  public onBlur() { }
  public onDelete(file) { }
  public summernoteInit(event) {
    console.log(event);
  }
  public onSubmit(draft: boolean) {
    console.log(this.form.value);
    console.log(this.form.value.html);
    if (this.form.value.html) {
      const {
        productName,
        market,
        productCode,
        uom,
        shelfLifeMonths,
        productType,
        dosageForm,
        inputCode,
        productTrackingCode,
        record
      } = this.HeaderForm.value;
      // Create a Blob directly from the HTML content
      const inputValues: any = this.wsrService.getInputFieldValues();
      const blob = new Blob([this.buildRawPreviewHtml()], { type: 'text/html' });
      const formData = new FormData();
      formData.append('htmlAttachments', blob, 'preview.html');

      // wsMasterDto = array of only double-click objects
      const wsMasterDtoArray = Object.keys(this.newAttributesAdded).map(key => {
        const attr = this.newAttributesAdded[key];
        return {
          uc0001: null,
          ff0001: attr.unitCode,
          ff0002: attr.min,
          ff0003: attr.max,
          ff0004: '',
          ff0005: '',
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
        };
      });

      // wsTFieldsDTO = product info fields + unitCodes from ff0010 onward
      const wsTFieldsDTOFields: any = {
        uc0001: null,
        ff0001: productName,
        ff0002: market,
        ff0003: productCode,
        ff0004: uom,
        ff0005: shelfLifeMonths,
        ff0006: productType,
        ff0007: dosageForm,
        ff0008: inputCode,
        ff0009: productTrackingCode,
      };
      Object.keys(this.newAttributesAdded).forEach((key, index) => {
        const attr = this.newAttributesAdded[key];
        wsTFieldsDTOFields[`ff${String(index + 10).padStart(4, '0')}`] = attr.unitCode;
      });

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
        wsMasterDto: wsMasterDtoArray,
        wsTFieldsDTO: wsTFieldsDTOFields,
        attachmentDto: {
          uc0001: null,
          ff0001: '',
          ff0005: productCode,
          ff0013: '',
          lc0002: '',
          lc0003: '',
          lc0004: '',
          documentAction: 'CREATE',
        },
      };
      const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
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
  public handleCommentsForm(event: Event) {
    console.log(event);
  }
   isOrgFieldValueSuccess = false;
  onChangeOrgCode() {
    if (this.HeaderForm.controls['record'].value == '') {
      this.HeaderForm.controls['record'].setValue('');
      this.HeaderForm.controls['record'].setValue('');
    } else {
      this.isOrgFieldValueSuccess = false;
      let businessUnitCodeFieldValue =
        this.HeaderForm.controls['record'].value;
      this.dropdownList.forEach((elements) => {
        if (elements.fiunitcode == businessUnitCodeFieldValue) {
          this.isOrgFieldValueSuccess = true;
          this.HeaderForm.controls['record'].setValue(elements.fiunitname);
        }
      });
      if (this.isOrgFieldValueSuccess == false) {
        this.HeaderForm.controls['record'].setErrors({ incorrect: true });
        this.openBusinessOrgCodeLOV();
      }
    }
  }
  openBusinessOrgCodeLOV(): void {
    const displayedColumns = [
      { field: 'fiunitcode', title: 'Unit Code' },
      { field: 'fiunitname', title: 'Unit Name' },
      { field: 'fitype', title: 'Type' },
    ];
    if (this.dropdownList.length > 0) {
      const dialogRef = this.dialog.open(LovDialogComponent, {
        height: '500px',
        width: '600px',
        data: {
          dialogTitle: 'Organization List',
          dialogColumns: displayedColumns,
          dialogData: this.dropdownList,
          lovName: 'organizationList',
        },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selectedDialogData.push(result.data.fiunitcode);
          let storeHtml: any[] = [];
          this.HeaderForm.controls['record'].setValue(
            result.data.fiunitcode
          );
          for (let i = 0; i < this.selectedDialogData.length; i++) {
            const uniqueId = 'select-field-' + Date.now();
            const selectFieldHTML = `
          <div>
          <input matInput type="button" id="${uniqueId}" class="btn btn-primary" style="color:red" value="${this.selectedDialogData[i]}" 
            (change)="openDialog()">
          </div>
          `;
            storeHtml.push(selectFieldHTML);
          }
          this.form.controls['html'].setValue(storeHtml);
        }
      });
    }
  }
  onChangeSubject() {
    if (this.pmsList.controls['productNo'].value == '') {
      this.pmsList.controls['productNo'].setValue('');
    } else {
      let statusCurrentValue = this.pmsList.controls['productNo'].value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        this.pmsList.controls['productNo'].setErrors({
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
        this.selectedData = result.data.productNO;
        let productNumber = result.data.productNO;
        console.log(this.selectedData)
        console.log(this.selectedData)
        this.pmsList.controls['productNo'].setValue(
          productNumber
        );

        this.dmsService
          .productList(productNumber)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.HeaderForm.patchValue({
                dosageForm: element.ff0009,
                productName: element.ff0001,
                productCode: element.ff0002,
                market: element.ff0003,
                uom: element.ff0007,
                shelfLifeMonths: element.ff0005,
                productType: element.ff0008,
                inputCode: element.ff0010,
                productTrackingCode: element.ff0011,
              });
            });
          });
      }
    });
  }
  // onChangeOrgCode(): void {}
 
  openDialog() {
    console.log('like');
    this.zone.run(() => {
      this.dialog.open(LovDialogComponent, {
        width: '250px',
        data: { message: 'Your dialog data here' },
      });
    });
  }


}
