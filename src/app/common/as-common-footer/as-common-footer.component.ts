import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-as-common-footer',
    templateUrl: './as-common-footer.component.html',
    styleUrls: ['./as-common-footer.component.scss'],
    standalone: false
})
export class AsCommonFooterComponent implements OnInit{
  @Input() pageData:any;
  @Input() showCommentsSection: boolean = true;
  @Output() comments = new EventEmitter<any>();
  isReadonly:boolean;
  commentsCurrentValue:any;
  QuotationForm:FormGroup;
   constructor(public fb:FormBuilder,){
    this.QuotationForm=this.fb.group({
      comments:['']
    })
   }
   ngOnInit(): void {
     this.isReadonly=true;
     this.QuotationForm.controls['comments'].setValue(this.pageData.comments)
    
   }
   onChangeCommentsValue(){
    this.comments.emit(this.QuotationForm.controls['comments'].value)
   }
}
