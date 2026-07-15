import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import {
  changeStatusByCode,
  changeStatusByDescription,
} from 'src/app/common/removeEmptyStrings';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { MessageService } from 'src/app/service/message.service';
import { ColumnMasterService } from '../column-master.service';
import { NotificationService } from 'src/app/common/notification.service';
import { CommonESignatureComponent } from 'src/app/common/common-e-signature/common-e-signature.component';
import { AdminService } from 'src/app/admin.service';
import { BusinessUnitService } from 'src/app/service/business-unit/business-unit.service';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}
@Component({
  selector: 'app-column-master-create-update',
  templateUrl: './column-master-create-update.component.html',
  styleUrls: ['./column-master-create-update.component.scss'],
  standalone: false,
})
export class ColumnMasterCreateUpdateComponent implements OnInit {
  isReadOnly = true;
  isUpdate = false;
  DepartmentMaster: FormGroup;
  orgList: any;
  buTypeList: any;
  unitList: any;
  formData: any;
  cciCmList: any
  isLoading = false;
  statusList: any;
  displayedColumns: any;
  selectedDialogData: any;
  isStatusSuccess = false;
  isPlantCodeSuccess = false;

  constructor(
    public fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<ColumnMasterCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private columnMasterService: ColumnMasterService,
    public buttonLabelService: ButtonLabelService,
    private businessUnitService: BusinessUnitService,
    private apiService: ApiService
  ) {
    this.DepartmentMaster = this.fb.group({
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      ff0003: ['', Validators.required],
      ff0004: ['', Validators.required],
      ff0005: ['', Validators.required],
      ff0006: ['', Validators.required],
      ff0007: ['', Validators.required],
      ff0008: ['', Validators.required],
      ff0009: ['', Validators.required],
      unitcode:[''],
      version: [''],
      createdby: [''],
      status: [''],
      comments: [''],
    });
  }

  ngOnInit(): void {
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.onLoadStatusDropDown();
    this.onloadDropDown2();
    // this.onloadDropDown();
    this.onLoadFiDropdown();
    this.onLoadAsgDropdown();
    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  buUnitList: any;
  mtMasterList: any;
  utMasterList: any;
  onloadDropDown() {
    this.isLoading = true;
    this.businessUnitService.getDropDownList().subscribe((data: any) => {
      this.orgList = data.data.orgList;
      this.buTypeList = data.data.buTypeList;
      this.unitList = data.data.unitList;
      this.isLoading = false;
    });
  }
   onloadDropDown2() {
    this.isLoading = true;
    this.columnMasterService.bmrInput(this.cookieService.get('buCode')).subscribe((data: any) => {
      console.log(data);
        this.cciCmList = data.data.cciCmList;
      this.isLoading = false;
    });
  }
  agMasterList: any;
  asgMasterList: any;
  onLoadFiDropdown() {
    this.isLoading = true;
    this.businessUnitService.getFiDropDownList().subscribe((data: any) => {
      this.orgList = data.data.orgList;
      this.agMasterList = data.data.agMasterList;
      this.unitList = data.data.unitList;
      this.isLoading = false;
    });
  }
  onLoadAsgDropdown() {
    this.isLoading = true;
    this.businessUnitService.getFiDropDownList().subscribe((data: any) => {
      this.orgList = data.data.orgList;
      this.asgMasterList = data.data.asgMasterList;
      this.unitList = data.data.unitList;
      this.isLoading = false;
    });
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.adminService.getDropDownList().subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    });
  }
  onLoadFormValue() {
    this.isLoading = true;
    let UC0001 = this.userData.tableData.uc0001;
    const params = { UC0001 };
    // this.glService
    //   .onGlMasterGetByMaxCode(this.userData.tableData.uc0001)
    //   .subscribe((data: any) => {
    this.apiService
      .sendRequest(apiEndPoints.ColumnMasterLoadUpdatePage, 'POST', params)
      .subscribe((data: any) => {
        if (data.data == null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.formData = data.data;
          this.isLoading = false;
          this.setFormValue();
        }
      });
  }
  setFormValue() {
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001);
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001);
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002);
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003);
    this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004);
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005);
    this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006);
    this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007);
    this.DepartmentMaster.controls['ff0008'].setValue(this.formData.ff0008);
    this.DepartmentMaster.controls['ff0009'].setValue(this.formData.ff0009);

    this.DepartmentMaster.controls['version'].setValue(this.formData.version);

    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
    let statusByValue = changeStatusByCode(this.formData.status);
    this.DepartmentMaster.controls['status'].setValue(statusByValue);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(
      changeStatusByDescription(this.DepartmentMaster.controls['status'].value)
    );
    let params = {};
    // this.glService
    //   .onGlMasterSaveUpdate(this.DepartmentMaster.value)
    //   .subscribe((data: any) => {
    this.apiService
      .sendRequest(
        apiEndPoints.ColumnMasterCreateUpdate,
        'POST',
        params,
        this.DepartmentMaster.value
      )
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
          this.DepartmentMaster.controls['status'].setValue(
            changeStatusByCode(this.DepartmentMaster.controls['status'].value)
          );
        } else {
          this.isLoading = false;
          this.messageService.sendSnackbar(
            'success',
            'Record Updated Successfully'
          );
          this.dialogRef.close();
        }
      }),
      (error) => {
        console.log(error);
        this.DepartmentMaster.controls['status'].setValue(
          changeStatusByCode(this.DepartmentMaster.controls['status'].value)
        );
      };
  }
  onSaveConfirmation() {
    //  if(this.documentDtoList.length > 0){
    const dialogRef = this.dialog.open(CommonESignatureComponent, {
      height: '300px',
      width: '600px',
      data: {},
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        if (this.selectedDialogData) {
          this.onCreate();
        }
      }
    });
  }
  onCreate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );
    let params = {};
    // this.glService
    //   .onGlMasterSaveUpdate(this.DepartmentMaster.value)
    //   .subscribe((data: any) => {
    this.apiService
      .sendRequest(
        apiEndPoints.ColumnMasterCreateUpdate,
        'POST',
        params,
        this.DepartmentMaster.value
      )
      .subscribe((data: any) => {
        if (data.errorInfo != null) {
          this.isLoading = false;
          this.dialog.open(MessageDialogComponent, {
            data: {
              message: data.errorInfo.message,
              heading: 'Error Information',
            },
          });
        } else {
          this.isLoading = false;
                     this.notificationService.showSuccess(data.status, () => {});
          this.dialogRef.close();
        }
      });
  }
  onClear() {
    this.DepartmentMaster.reset();
  }
  openBusinessUnitCodeLOV() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Business Unit',
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0009'].setValue(
          this.selectedDialogData.unitCode
        );
      }
    });
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0009'].value == '') {
      this.DepartmentMaster.controls['ff0009'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['ff0009'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach((elements) => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0009'].setErrors({ incorrect: true });
        this.openBusinessUnitCodeLOV();
      }
    }
  }

  openStatusLOV() {
    this.displayedColumns = [
      { field: 'code', title: 'Code' },
      { field: 'description', title: 'Descritption' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Status',
        dialogColumns: this.displayedColumns,
        dialogData: this.statusList,
        lovName: 'statusList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['status'].setValue(
          this.selectedDialogData.description
        );
      }
    });
  }

  onChangeStatus() {
    if (this.DepartmentMaster.controls['status'].value == '') {
      this.DepartmentMaster.controls['status'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['status'].value;
      this.statusList.forEach((elements) => {
        if (elements.description == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['status'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
  openAccountGroupCodeLOV() {
    this.displayedColumns = [
      { field: 'agCode', title: 'Code' },
      { field: 'agName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Account Group No',
        dialogColumns: this.displayedColumns,
        dialogData: this.agMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0001'].setValue(
          this.selectedDialogData.agName
        );
      }
    });
  }
  onChangeAccountGroupCode() {
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0001'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0001'].value;
      this.agMasterList.forEach((elements) => {
        if (elements.agCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0001'].setErrors({ incorrect: true });
        this.openAccountGroupCodeLOV();
      }
    }
  }
  openAccountGroupSubCodeLOV() {
    this.displayedColumns = [
      { field: 'asgCode', title: 'Code' },
      { field: 'asgName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Account Sub Group Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.asgMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0003'].setValue(
          this.selectedDialogData.asgName
        );
      }
    });
  }
  onChangeAccountSubGroupCode() {
    if (this.DepartmentMaster.controls['ff0009'].value == '') {
      this.DepartmentMaster.controls['ff0009'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0009'].value;
      this.asgMasterList.forEach((elements) => {
        if (elements.asgCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0009'].setErrors({ incorrect: true });
        this.openAccountGroupCodeLOV();
      }
    }
  }
  openColumnTypeListLOV() {
    this.displayedColumns = [
      { field: 'columnnumber', title: 'Column Type No' },
      { field: 'columnname', title: 'Column Type Code' },
      { field: 'columncode', title: 'Column Type Name' },

    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Column List ',
        dialogColumns: this.displayedColumns,
        dialogData: this.cciCmList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0001'].setValue(
          this.selectedDialogData.columnname
        );
      }
    });
  }
    onChangeColumnType() {
    if (this.DepartmentMaster.controls['ff0001'].value == '') {
      this.DepartmentMaster.controls['ff0001'].setValue('');
      
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0001'].value;
      this.cciCmList.forEach((elements) => {
        if (elements.productNO == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0001'].setErrors({ incorrect: true });
        this.openColumnTypeListLOV();
      }
    }
  }
}
