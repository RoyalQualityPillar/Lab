import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MaterialTypeService } from '../material-type.service';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { CookieService } from 'ngx-cookie-service';
//import { BusinessUnitService } from '../../business-unit/business-unit.service';
import { MessageService } from 'src/app/service/message.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';
import { ButtonLabelService } from 'src/app/service/button-label.service';
//import { CommonESignatureComponent } from 'src/app/common/common-e-signature/common-e-signature.component';
import { NotificationService } from 'src/app/common/notification.service';
import { RemoteComponentLoaderService } from 'src/app/service/remote-component-loader.service';
import { AdminService } from 'src/app/admin.service';

export interface userData {
  userData: any;
  type: any;
  tableData: any;
}

@Component({
  selector: 'app-material-type-create-update',
  templateUrl: './material-type-create-update.component.html',
  styleUrls: ['./material-type-create-update.component.scss'],
  standalone: false,
})
export class MaterialTypeCreateUpdateComponent implements OnInit {
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
    private adminService: AdminService,
    public dialog: MatDialog,
   private remoteLoader: RemoteComponentLoaderService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    public buttonLabelService: ButtonLabelService,
    private materialTypeService: MaterialTypeService,
   // private businessUnitService: BusinessUnitService,
    private apiService: ApiService,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<MaterialTypeCreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: userData
  ) {
    this.DepartmentMaster = this.fb.group({
      ff0002: ['', Validators.required],
      uc0001: [''],
      ff0001: ['', Validators.required],
      ff0003: ['', Validators.required],
      createdby: [''],
      status: [''],
      comments: ['', Validators.required],
      unitcode: ['']

    });
  }

  ngOnInit(): void {
    this.DepartmentMaster.controls['unitcode'].patchValue(
      this.cookieService.get('buCode')
    );
    this.DepartmentMaster.controls['ff0002'].patchValue(
      this.cookieService.get('buCode')
    );
    this.onLoadStatusDropDown();
    this.onloadDropDown();
    if (this.userData.type == 'Modification') {
      this.isReadOnly = true;
      this.isUpdate = true;
      this.onLoadFormValue();
    } else {
      this.isReadOnly = false;
      this.isUpdate = false;
    }
  }

  onloadDropDown() {
    this.isLoading = true;
    let unitCode = this.cookieService.get('buCode');
    let params = { unitCode };
    // this.businessUnitService.getDropDownList().subscribe((data: any) => {
    this.apiService
      .sendRequest(apiEndPoints.dropDownInputList, 'GET', params)
      .subscribe((data: any) => {
        this.orgList = data.data.orgList;
        this.buTypeList = data.data.buTypeList;
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
    this.apiService
      .sendRequest(apiEndPoints.materialTypeLoadUpdatePage, 'POST', params)
      .subscribe((data: any) => {
        this.formData = data.data;
        this.isLoading = false;
        this.setFormValue();
      });
  }
  setFormValue() {
    this.DepartmentMaster.controls['uc0001'].setValue(this.formData.uc0001);
    this.DepartmentMaster.controls['ff0001'].setValue(this.formData.ff0001);
    this.DepartmentMaster.controls['ff0002'].setValue(this.formData.ff0002);
    this.DepartmentMaster.controls['ff0003'].setValue(this.formData.ff0003);
    this.DepartmentMaster.controls['status'].setValue(this.formData.status);
    this.DepartmentMaster.controls['comments'].setValue(this.formData.comments);
  }
  onUpdate() {
    this.isLoading = true;
    this.DepartmentMaster.controls['createdby'].setValue(
      this.cookieService.get('userId')
    );
    let params = {};
    this.materialTypeService
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
            'Record Created Successfully'
          );
          this.dialogRef.close();
        }
      });
  }
 async onSaveConfirmation() {
    //  if(this.documentDtoList.length > 0){
      const component = await this.remoteLoader.loadComponentByKey('CommonESignatureComponent');
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
    this.materialTypeService
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
          this.notificationService.showSuccess(data.status, () => {
            console.log('Success Snackbar Closed');
          });
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
        this.DepartmentMaster.controls['ff0002'].setValue(
          this.selectedDialogData.unitCode
        );
      }
    });
  }

  onChangePlantCode() {
    if (this.DepartmentMaster.controls['ff0002'].value == '') {
      this.DepartmentMaster.controls['ff0002'].setValue('');
    } else {
      let currentPlantCodeValue =
        this.DepartmentMaster.controls['ff0002'].value;
      this.isPlantCodeSuccess = false;
      this.unitList.forEach((elements) => {
        if (elements.unitCode == currentPlantCodeValue) {
          this.isPlantCodeSuccess = true;
        }
      });
      if (this.isPlantCodeSuccess == false) {
        this.DepartmentMaster.controls['ff0002'].setErrors({ incorrect: true });
        this.openBusinessUnitCodeLOV();
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
        dialogTitle: 'Price Type Master',
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
          this.selectedDialogData.code
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
}
