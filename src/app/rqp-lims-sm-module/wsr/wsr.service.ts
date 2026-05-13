import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
// import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare var $;

function insertButton() {
  const buttonHtml = '<button class="custom-button">Click Me</button>'; // HTML for the button
  $('#summernote').summernote('insertNode', $(buttonHtml)[0]); // Insert the button at the current position
}

@Injectable({
  providedIn: 'root',
})
export class WsrService {
  public headerData: any;
  public pageData: any;
  public apiUrl: string;
  public uc0001 = new BehaviorSubject<string>('');
  public options = [
    { text: 'Option 1', value: 'option1' },
    { text: 'Option 2', value: 'option2' },
    { text: 'Option 3', value: 'option3' },
  ];
  public commentForm: FormGroup = new FormGroup({
    comments: new FormControl(''),
    nextStage: new FormControl(''),
  });
  public form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required),
    inputs: new FormArray([]),
  });

  public productInformation = new FormGroup({
    productName: new FormControl(''),
    protocolNo: new FormControl(''),
    sampleDes: new FormControl(''),
    testParameter: new FormControl(''),
    analystName: new FormControl(''),
    batchNo: new FormControl(''),
    arNo: new FormControl(''),
    stp: new FormControl(''),
    record: new FormControl(''),
  });

  constructor(private cookieService: CookieService) {}

  public getHeaderData(event: any) {
    this.uc0001.next(event.unitcode);
    this.apiUrl = environment.apiBaseURL + `limspc/input`;
    return (this.headerData = event);
  }

  public addInputFieldControl(uniqueId: string) {
    const inputs = this.form.get('inputs') as FormArray;
    inputs.push(new FormControl(uniqueId));
  }

  public getInputFieldValues() {
    const inputs = this.form.get('inputs') as FormArray;
    const values = inputs.controls.map((control) => {
      const inputId = control.value;
      const inputElement = document.getElementById(inputId) as HTMLInputElement;
      return inputElement ? inputElement.value : null;
    });
    return values;
  }

  public onSubmit() {
    const inputValues = this.getInputFieldValues();
    console.log('Submitted values:', inputValues);
  }

  // public config: SummernoteOptions = {
  //   airMode: false,
  //   popover: {
  //     table: [
  //       ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
  //       ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
  //     ],
  //     image: [
  //       ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
  //       ['float', ['floatLeft', 'floatRight', 'floatNone']],
  //       ['remove', ['removeMedia']],
  //     ],
  //     link: [['link', ['linkDialogShow', 'unlink']]],
  //     air: [
  //       [
  //         'font',
  //         [
  //           'bold',
  //           'italic',
  //           'underline',
  //           'strikethrough',
  //           'superscript',
  //           'subscript',
  //           'clear',
  //         ],
  //       ],
  //     ],
  //   },
  //   height: 200,
  //   uploadImagePath: '/api/upload',
  //   toolbar: [
  //     ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
  //     [
  //       'font',
  //       [
  //         'bold',
  //         'italic',
  //         'underline',
  //         'strikethrough',
  //         'superscript',
  //         'subscript',
  //         'clear',
  //       ],
  //     ],
  //     ['fontsize', ['fontname', 'fontsize', 'color']],
  //     ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
  //     ['insert', ['table', 'picture', 'link', 'video', 'hr']],
  //     ['view', ['fullscreen', 'codeview', 'help']],
  //     ['insert', ['inputField']],
  //     ['custom', ['insertButton']],
  //   ],
  //   fontNames: [
  //     'Arial',
  //     'Times New Roman',
  //     'Inter',
  //     'Comic Sans MS',
  //     'Courier New',
  //     'Roboto',
  //     'Times',
  //     'MangCau',
  //     'BayBuomHep',
  //     'BaiSau',
  //     'BaiHoc',
  //     'CoDien',
  //     'BucThu',
  //     'KeChuyen',
  //     'MayChu',
  //     'ThoiDai',
  //     'ThuPhap-Ivy',
  //     'ThuPhap-ThienAn',
  //   ],
  //   buttons: {
  //     inputField: (context) =>
  //       this.inputFieldButton(context, this, this.cookieService),
  //     insertButton: () => {
  //       return `<button type="button" class="btn btn-primary btn-sm">Insert Button</button>`;
  //     },
  //   },

  //   callbacks: {
  //     onInit: () => {
  //       $('#summernoteEditor').summernote(
  //         'code',
  //         '<p>This is default text</p>'
  //       );
  //     },
  //   },
  // };

  private inputFieldButton(context, componentRef, cookieService) {
    const ui = $.summernote.ui;
    const button = ui.button({
      contents: '<i class="note-icon-pencil"></i> Dropdown-Variables',
      tooltip: 'Insert Input Field',
      className: 'input-field-btn',
      click: () => {
        this.insertSelectField(context, componentRef);
      },
    });
    return button.render();
  }

  private async insertSelectField(context, componentRef) {
    const uniqueId = 'select-field-' + Date.now();

    const selectFieldHTML = `
      <input type="submit" id="${uniqueId}" class="btn btn-primary" style="color:red">
       Hello
      </input>
    `;
    context.invoke('editor.insertNode', $(selectFieldHTML)[0]);
    componentRef.addInputFieldControl(uniqueId);
  }

  createCustomButton() {
    const self = this; // Save 'this' reference to maintain the correct context inside the click handler

    return function (context) {
      const ui = $.summernote.ui;

      // Create button
      const button = ui.button({
        contents: '<i class="note-icon-pencil"/> Custom Button', // Button content (icon + text)
        tooltip: 'Click me',
        click: function () {
          // Call the createCustomButtonHtml method, preserving 'this' context
          self.addCustomButton();
        },
      });

      return button.render(); // Return button as a jQuery object
    };
  }

  addCustomButton = () => {
    return $.summernote.ui
      .button({
        contents: '<i class="note-icon-button"/> Add Button',
        tooltip: 'Add HTML Button',
        click: function () {
          $('#summernote').summernote(
            'insertNode',
            $('<button>Click Me</button>')[0]
          );
        },
      })
      .render();
  };

  private customButton(context) {
    const ui = $.summernote.ui;
    const button = ui.button({
      contents: '<i class="note-icon-magic"></i> Insert Button',
      tooltip: 'Insert a custom button',
      className: 'note-btn',
      click: () => {
        insertButton();
      },
    });
    return button.render();
  }

  insertCustomButton() {
    // Define the HTML for the button to insert
    const buttonHtml = `<button type="button" class="btn btn-primary">My Custom Button</button>`;
    $('#summernote').summernote('insertHtml', buttonHtml);
  }
}
