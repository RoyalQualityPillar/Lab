import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-common-editor',
  templateUrl: './common-editor.component.html',
  styleUrls: ['./common-editor.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonEditorComponent),
      multi: true,
    },
  ],
})
export class CommonEditorComponent implements ControlValueAccessor {
  @Input() height: number = 420;
  @Input() placeholder: string = 'Start writing your content here...';
  @Input() menubar: boolean = true;
  @Input() editorPlugins: string[] = [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'wordcount'
  ];
  @Input() editorToolbar: string =
    'undo redo | bold italic underline strikethrough | ' +
    'blocks fontfamily fontsize | alignleft aligncenter alignright alignjustify | ' +
    'bullist numlist outdent indent | link image table | ' +
    'forecolor backcolor removeformat | fullscreen code';

  @Output() editorReady = new EventEmitter<any>();
  @Output() editorDblclick = new EventEmitter<void>();

  editorContent: string = '';
  editorConfig: Record<string, any> = {};
  private editorInstance: any = null;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit() {
    this.editorConfig = {
      height: this.height,
      license_key: 'gpl',
      promotion: false,
      branding: false,
      placeholder: this.placeholder,
      menubar: this.menubar,
      plugins: this.editorPlugins,
      toolbar: this.editorToolbar,
      content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
      setup: (editor: any) => {
        editor.on('dblclick', () => {
          this.editorDblclick.emit();
        });
        editor.on('init', () => {
          this.editorInstance = editor;
          this.editorReady.emit(editor);
        });
      },
    };
  }

  /** Insert HTML content at the current cursor position */
  insertContent(content: string): void {
    if (this.editorInstance) {
      this.editorInstance.insertContent(content);
    }
  }

  onEditorChange(content: string) {
    this.editorContent = content;
    this.onChange(content);
  }

  onEditorBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.editorContent = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
