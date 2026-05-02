import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { SpmService } from '../spm.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { LovDialogComponent } from 'src/app/common/lov-dialog/lov-dialog.component';
import { PmsListComponent } from '../../pms-list/pms-list.component';

@Component({
  selector: 'app-spm-initiator',
  standalone: false,
  templateUrl: './spm-initiator.component.html',
  styleUrl: './spm-initiator.component.scss'
})
export class SpmInitiatorComponent implements OnInit {
   public SPMRequirementForm: FormGroup;
  public ContainerRequirementForm: FormGroup;
 public headerData: any;
  public pageData: any;
   public nextStageListData: any;
  public headerRequestBody: any;
  public isLoading = false;
   public isStatusSuccess = false;
   public selectedDialogData: any;
     public isSubjectCodeSuccess: boolean;
  public displayedColumns: any;
   public pmmMaterialList: any[] = [];
   public psmList: any[] = [];
    public saleProductList: any[] = [];

  constructor(
        private toolbarService: ToolbarService,
        private spmService: SpmService,
        public fb: FormBuilder,
         private cookieService: CookieService,
          public dialog: MatDialog,
  ){
 this.SPMRequirementForm = fb.group({
      products: fb.array([this.createProduct()])
    });
     this.ContainerRequirementForm = this.fb.group({
      containers: this.fb.array([this.createContainer()])
    });
  }
  
  ngOnInit(): void {
     this.pageData = {
      pageName: 'homePage',
      pageType: 'create',
      isRasiInit: 'spm-Initiator',
    };
     this.onLoadNextStageData();
     this.onloadDropDownList();
  }
   createProduct(): FormGroup {
    return this.fb.group({
      productNo: [''],
      productName: [''],
      market: [''],
      productCode: [''],
      uom: [''],
      shelfLifeMonths: [''],
      productType: [''],
      dosageForm: [''],
      inputCode: [''],
      productTrackingCode: [''],
      requestNo: [''],
      version: [''],
    });
  }
  get products(): FormArray {
    return this.SPMRequirementForm.get('products') as FormArray;
  }
   addProduct() {
    this.products.push(this.createProduct());
  }
   removeProduct(index: number) {
    this.products.removeAt(index);
  }
   createContainer(): FormGroup {
    return this.fb.group({
      materialNo: [''],
      materialName: [''],
      materialCode: [''],
      weight: [''],
      weightUom: ['']
    });
  }
  get containers(): FormArray {
    return this.ContainerRequirementForm.get('containers') as FormArray;
  }
  addContainer() {
    this.containers.push(this.createContainer());
  }
  removeContainer(index: number) {
    this.containers.removeAt(index);
  }
   onloadDropDownList() {
    this.isLoading = true;
    this.spmService.getDropDownList(this.cookieService.get('buCode')).subscribe((data: any) => {
      this.pmmMaterialList = data.data.pmmMaterialList;
      this.saleProductList = data.data.saleProductList;
      this.isLoading = false;
    });
  }
 public onLoadNextStageData() {
    let body: any;
    body = {
      lcNumber: this.headerRequestBody.lifeCycleCode,
      //lcStage:this.headerRequestBody.stage
      lcStage: this.toolbarService.currentStage,
    };

    this.spmService.getNextStageList(body).subscribe((data: any) => {
      this.nextStageListData = data.data.nstage;
    });
  }
   getHeaderData(event: any) {
    this.headerData = event;
    let uc0001 = this.headerData.unitcode;
    this.spmService.bmrInput(uc0001).subscribe(({ data }) => {
      this.psmList = data.pmsList;
    });
  }
  onChangeSubject(index: number) {
    const productNumber = this.products.at(index).get('productNo');
    if (!productNumber.value) {
      productNumber.setValue('');
    } else {
      let statusCurrentValue = productNumber.value;
      this.psmList.forEach((elements) => {
        if (elements.mdGName == statusCurrentValue) {
          this.isSubjectCodeSuccess = true;
        }
      });
      if (this.isSubjectCodeSuccess == false) {
        productNumber.setErrors({
          incorrect: true,
        });
        this.openStatusLOV(index);
      }
    }
  }

  openStatusLOV(index: number) {
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
        this.selectedDialogData = result.data;
        this.products.at(index).patchValue({
          productNo: this.selectedDialogData.productNO
        });

        this.spmService
          .productList(this.selectedDialogData.productNO)
          .subscribe(({ data }) => {
            data.forEach((element) => {
              this.products.at(index).patchValue({
                dosageForm: element.ff0009,
                productName: element.ff0001,
                productCode: element.ff0002,
                market: element.ff0003,
                uom: element.ff0007,
                shelfLifeMonths: element.ff0005,
                productType: element.ff0008,
                inputCode: element.ff0010,
                productTrackingCode: element.ff0011,
                requestNo: element.ff0007,
                version: element.ff0008,
              });
            });
          });
      }
    });
  }
   openMaterialListLOV(index: number) {
    this.displayedColumns = [
      { field: 'materialnumber', title: 'Material Number' },
      { field: 'materialcode', title: 'Material Code' },
      { field: 'materialname', title: 'Material Name' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Sales Product List',
        dialogColumns: this.displayedColumns,
        dialogData: this.pmmMaterialList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedDialogData = result.data;
        this.containers.at(index).patchValue({
          materialNo: this.selectedDialogData.materialnumber,
          materialName: this.selectedDialogData.materialname,
          materialCode: this.selectedDialogData.materialcode
        });
      }
    });
  }
  onChangeByMaterialCode(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialCode.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialCode.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitcode == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialNo(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialNo.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialNo.value;
      this.saleProductList.forEach((elements) => {
        if (elements.punumber == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
  onChangeMaterialName(index: number) {
    const materialNo = this.containers.at(index).get('materialNo');
    const materialName = this.containers.at(index).get('materialName');
    const materialCode = this.containers.at(index).get('materialCode');
    if (materialName.value == '') {
      materialNo.setValue('');
      materialName.setValue('');
      materialCode.setValue('');
    } else {
      this.isStatusSuccess = false;
      let statusCurrentValue = materialName.value;
      this.saleProductList.forEach((elements) => {
        if (elements.puunitname == statusCurrentValue) {
          this.isStatusSuccess = true;
        }
      });
      if (this.isStatusSuccess == false) {
        materialNo.setErrors({ incorrect: true });
        materialName.setErrors({ incorrect: true });
        materialCode.setErrors({ incorrect: true });
        this.openMaterialListLOV(index);
      }
    }
  }
}

