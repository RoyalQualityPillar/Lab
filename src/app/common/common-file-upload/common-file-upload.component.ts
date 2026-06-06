import { Component,OnInit,AfterViewInit,Inject  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/service/message.service';
export interface userData {
  userData: any;
  type:any;
  tableData:any;
  title:any;
  isUpdate:boolean;
  UserRoleTable:any;
  documentDtoList:any;
  selectedRow:any;
}

@Component({
    selector: 'app-common-file-upload',
    templateUrl: './common-file-upload.component.html',
    styleUrls: ['./common-file-upload.component.scss'],
    standalone: false
})
export class CommonFileUploadComponent implements OnInit  {
  isReadOnly=false;
  UserRequirementForm: FormGroup;
  constructor(public fb: FormBuilder,
              public dialog: MatDialog,
              private messageService:MessageService,
              public dialogRef: MatDialogRef<CommonFileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public userData: userData){
                this.UserRequirementForm=this.fb.group({
                  attachmentName:[''],
                  documentName:[''],
                  categoryTypes:[''],
                  attachmenentCategoryTypes:[''],
                 })
              }
  ngOnInit(): void {
    console.log(this.userData)
    if(this.userData.type == 'newDoc'){

    }else if(this.userData.type == 'UpdateDoc'){
      this.setFormData()
    }else{
      console.log(this.userData.type)
    }
  }
  selectedFiles:any;
  uploadedDocfileName:any;
  handleFileInput(event:any){
    this.selectedFiles= event.target.files[0];
    if(this.selectedFiles){
     this.uploadedDocfileName=this.selectedFiles.name;
    }
    }
    onUpdate(){
      console.log(this.userData.selectedRow.uc0001)
      this.userData.documentDtoList.forEach((element)=>{
        if(element.uc0001==this.userData.selectedRow.uc0001){
          element.selectedFileList=this.selectedFiles,
          element.documentName=this.UserRequirementForm.controls['documentName'].value,
          element.categoryTypes=this.UserRequirementForm.controls['categoryTypes'].value,
          element.ff0001=this.UserRequirementForm.controls['documentName'].value,
          element.ff0005=this.UserRequirementForm.controls['categoryTypes'].value,
          element.newRecord=false,
          element.documentAction='MODIFY'
        }
      })
      
    
    console.log(this.userData.documentDtoList);
    this.dialogRef.close({result:this.userData.documentDtoList})
    }
    documentRow=[]
    onCreate(){
      let mTypeValidation=true;
      if(this.UserRequirementForm.controls['categoryTypes'].value == 'M'){
        this.userData.documentDtoList.forEach((element:any)=>{
          if(element.categoryTypes == this.UserRequirementForm.controls['categoryTypes'].value){
            mTypeValidation=false;
            this.dialog.open(MessageDialogComponent, {
              data: { 'message': "Category type 'M' already available", 'heading': "Error Information" }
            });
          }
        })
      }else{
        mTypeValidation = true;
      }
      if(mTypeValidation){
     this.userData.documentDtoList.push({
        selectedFileList:this.selectedFiles,
        documentName:this.UserRequirementForm.controls['documentName'].value,
        categoryTypes:this.UserRequirementForm.controls['categoryTypes'].value,
        ff0001:this.UserRequirementForm.controls['documentName'].value,
        ff0005:this.UserRequirementForm.controls['categoryTypes'].value,
        newRecord:true,
        documentAction:'CREATE'
     })
    }
    console.log(this.userData.documentDtoList);
    this.dialogRef.close({result:this.userData.documentDtoList})
  }
  setFormData(){
    console.log(this.userData.selectedRow)
    this.UserRequirementForm.controls['documentName'].setValue(this.userData.selectedRow.documentName);
    this.UserRequirementForm.controls['categoryTypes'].setValue(this.userData.selectedRow.categoryTypes)
  }
}
