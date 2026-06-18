import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'src/app/service/message.service';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import {
  changeStatusByCode,
  changeStatusByDescription,
} from 'src/app/common/removeEmptyStrings';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { ApiService } from 'src/app/service/api-service/api.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ButtonLabelService } from 'src/app/service/button-label.service';
import { NotificationService } from 'src/app/common/notification.service';
import { MaterialMasterService } from '../material-master.service';
export interface userData {
  userData: any;
  type: any;
  tableData: any;
}

@Component({
  selector: 'app-create-update-material-master',
  templateUrl: './create-update-material-master.component.html',
  styleUrls: ['./create-update-material-master.component.scss'],
  standalone: false,
})
export class CreateUpdateMaterialMasterComponent implements OnInit {
  isReadOnly = true;
  isUpdate = false;
  DepartmentMaster: FormGroup;
  orgList: any;
  buTypeList: any;
  unitList: any;
  formData: any;
  isLoading = false;
  statusList: any;
  displayedColumns: any;
  selectedDialogData: any;
  isStatusSuccess = false;
  isPlantCodeSuccess = false;

  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    public buttonLabelService: ButtonLabelService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<CreateUpdateMaterialMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData,
    private materialMasterService: MaterialMasterService
  ) {
    this.DepartmentMaster = this.fb.group({
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0002: ['', Validators.required],
      // ff0003: ['', Validators.required],
      ff0004: ['', [Validators.required]],
      ff0005: ['', Validators.required],
      ff0007: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['', Validators.required],
      unitcode:['']
    });
  }

  ngOnInit(): void {
   
    this.onLoadStatusDropDown();
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.DepartmentMaster.controls['ff0004'].patchValue(
      this.cookieService.get('buCode')
    );
    this.onloadDropDown();
    this.onloadDFListDropDown();
    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }
  dfList: any;
  onloadDFListDropDown() {
    this.isLoading = true;
    this.materialMasterService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.dfList = data.data.dfList;
      this.isLoading = false;
    });
  }
  buUnitList: any;
  mtMasterList: any;
  utMasterList: any;
  onloadDropDown() {
    this.isLoading = true;
    this.materialMasterService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.buUnitList = data.data.buUnitList;
      this.mtMasterList = data.data.mtMasterList;
      this.utMasterList = data.data.utMasterList;
      this.isLoading = false;
    });
  }
  onLoadStatusDropDown() {
    this.isLoading = true;
    this.materialMasterService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.statusList = data.data.statusInfo;
      this.isLoading = false;
    });
  }
  onLoadFormValue() {
    this.isLoading = true;
    let UC0001 = this.userData.tableData.uc0001;

    const params = { UC0001 };

    this.apiService
      .sendRequest(apiEndPoints.MaterialMasterLoadUpdatePage, 'POST', params)
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
    // this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003);
    this.DepartmentMaster.controls['ff0004'].setValue(this.formData.ff0004);
    this.DepartmentMaster.controls['ff0005'].setValue(this.formData.ff0005);
    // this.DepartmentMaster.controls['ff0006'].setValue(this.formData.ff0006);
    this.DepartmentMaster.controls['ff0007'].setValue(this.formData.ff0007);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
    let statusByValue = changeStatusByCode(this.formData.status);
    this.DepartmentMaster.controls['status'].setValue(statusByValue);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['status'].setValue(
      changeStatusByDescription(this.DepartmentMaster.controls['status'].value)
    );

    this.materialMasterService
    .onCreate(this.DepartmentMaster.value)
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
          this.messageService.sendSnackbar(
            'success',
            'Record Updated Successfully'
          );
          this.dialogRef.close();
        }
      });
  }
  onCreate() {
    this.isLoading = true;

    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );

    this.materialMasterService
      .onCreate(this.DepartmentMaster.value)
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
          // this.messageService.sendSnackbar(
          //   'success',
          //   'Record Created Successfully'
          // );
          this.notificationService.showSuccess(data.status, () => {
          });
          this.dialogRef.close();
        }
      });
  }
  onClear() {
    this.DepartmentMaster.reset();
  }
  openPlantCodeLOV() {
    this.displayedColumns = [
      { field: 'buunitcode', title: 'Code' },
      { field: 'buunitname', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Plant Code',
        dialogColumns: this.displayedColumns,
        dialogData: this.buUnitList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0004'].setValue(
          this.selectedDialogData.buunitcode
        );
      }
    });
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0004'].value == '') {
      this.DepartmentMaster.controls['ff0004'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['ff0004'].value;
      this.isPlantCodeSuccess = false;
      this.buUnitList.forEach((elements) => {
        if (elements.buunitcode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0004'].setErrors({ incorrect: true });
        this.openPlantCodeLOV();
      }
    }
  }
  openProductCategoryLOV() {
    this.displayedColumns = [
      { field: 'mtCode', title: 'Material Categoty Code' },
      { field: 'mtName', title: 'Material Categoty Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Material Categoty',
        dialogColumns: this.displayedColumns,
        dialogData: this.mtMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0005'].setValue(
          this.selectedDialogData.mtCode
        );
      }
    });
  }
  onChangeProductCategory() {
    if (this.DepartmentMaster.controls['ff0005'].value == '') {
      this.DepartmentMaster.controls['ff0005'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0005'].value;
      this.mtMasterList.forEach((elements) => {
        if (elements.mtCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0005'].setErrors({ incorrect: true });
        this.openProductCategoryLOV();
      }
    }
  }
  openStatusLOV() {
    this.displayedColumns = [
      { field: 'code', title: 'Status Code' },
      { field: 'description', title: 'Status Name' },
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
          this.selectedDialogData.code
        );
      }
    });
  }

  openUOMLOV() {
    this.displayedColumns = [
      { field: 'utCode', title: 'UOM Code' },
      { field: 'utName', title: 'UOM Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'UOM',
        dialogColumns: this.displayedColumns,
        dialogData: this.utMasterList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['ff0007'].setValue(
          this.selectedDialogData.utName
        );
      }
    });
  }
  onChangeUOM() {
    if (this.DepartmentMaster.controls['ff0007'].value == '') {
      this.DepartmentMaster.controls['ff0007'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['ff0007'].value;
      this.utMasterList.forEach((elements) => {
        if (elements.utCode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['ff0007'].setErrors({ incorrect: true });
        this.openUOMLOV();
      }
    }
  }
  onChangeStatus() {
    if (this.DepartmentMaster.controls['status'].value == '') {
      this.DepartmentMaster.controls['status'].setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = this.DepartmentMaster.controls['status'].value;
      this.statusList.forEach((elements) => {
        if (elements.code == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        this.DepartmentMaster.controls['status'].setErrors({ incorrect: true });
        this.openStatusLOV();
      }
    }
  }
  onChangePlantCode2() {
    if (this.DepartmentMaster.controls['unitcode'].value == '') {
      this.DepartmentMaster.controls['unitcode'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['unitcode'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach((elements) => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['unitcode'].setErrors({
          incorrect: true,
        });
        this.openBusinessUnitCodeLOV2();
      }
    }
  }
  openBusinessUnitCodeLOV2() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'material Master',
        dialogColumns: this.displayedColumns,
        dialogData: this.unitList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.DepartmentMaster.controls['unitcode'].setValue(
          this.selectedDialogData.unitCode
        );
      }
    });
  }
}
