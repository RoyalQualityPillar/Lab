import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LovDialogComponent } from '../lov-dialog/lov-dialog.component';
// import { AdminService } from 'src/app/rqp-admin-module/admin-data/admin.service';
//import { QmsService } from 'src/app/rqp-qms-module/qms.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin.service';
import { LimsService } from 'src/app/rqp-lims-module/lims.service';

@Component({
    selector: 'app-item-name-no',
    templateUrl: './item-name-no.component.html',
    styleUrls: ['./item-name-no.component.scss'],
    standalone: false
})
export class ItemNameNoComponent implements OnInit {
  dialogColumns: any;
  dialogData: any;
  selectedData: any;
  lovName: any;
  dialogTitle: any;
  displayedColumns: any[] = [];
  moduleList: any;
  trainingPending = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);
  displayColumns: string[] = ['action', 'uc0001', 'ff0001'];

  LifeCycleForm = new FormGroup({
    moduleInput: new FormControl(''),
    module: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public refDialog: MatDialogRef<ItemNameNoComponent>,
    public dialog: MatDialog,
    private adminService: AdminService,
    private limsService: LimsService,
    public dialogRef: MatDialogRef<ItemNameNoComponent>
  ) {}

  ngOnInit() {
    this.dialogColumns = this.data.dialogColumns;
    this.dialogData = this.data.dialogData;
    this.dialogTitle = this.data.dialogTitle;
  }

  onSelectedChange(val) {
    this.selectedData = val;
    this.refDialog.close({ data: this.selectedData });
  }

  closePopUp() {
    this.refDialog.close();
  }
  onPagination(event: any) {
    //todo
  }

  moduleInput() {
    if (this.LifeCycleForm.controls['moduleInput'].value == '') {
      this.LifeCycleForm.controls['moduleInput'].setValue('');
    } else {
      this.moduleInputLOV();
    }
  }

  moduleInputLOV() {
    this.displayedColumns = [
      { field: 'unitCode', title: 'Code' },
      { field: 'unitName', title: 'Description' },
    ];
    const dialogRef = this.dialog.open(LovDialogComponent, {
      height: '500px',
      width: '600px',
      data: {
        dialogTitle: 'Department',
        dialogColumns: this.displayedColumns,
        dialogData: this.data.moduleTypeList,
        lovName: 'businessUnitList',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.LifeCycleForm.controls['moduleInput'].patchValue(
          result.data.unitCode
        );
      }
    });
  }

  onChangeModuleCode() {
    if (this.LifeCycleForm.controls['module'].value == '') {
      this.LifeCycleForm.controls['module'].setValue('');
    } else {
      this.openModuleCodeLOV();
    }
  }

  openModuleCodeLOV() {
    this.limsService
      .adminModuleInput(this.LifeCycleForm.controls['moduleInput'].value)
      .subscribe((data) => {
        this.moduleList = data.data.mdMasterList;
        this.displayedColumns = [
          { field: 'mdGCode', title: 'Code' },
          { field: 'mdGName', title: 'Description' },
        ];

        const dialogRef = this.dialog.open(LovDialogComponent, {
          height: '500px',
          width: '600px',
          data: {
            dialogTitle: 'Module',
            dialogColumns: this.displayedColumns,
            dialogData: this.moduleList,
            lovName: 'businessUnitList',
          },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.LifeCycleForm.controls['module'].patchValue(
              result.data.mdGName
            );
            const { module } = this.LifeCycleForm.controls;
            if (module.value) {
              this.limsService
                .trainingPending(this.data.ff0004, module.value)
                .subscribe(({ data }) => {
                  this.trainingPending.data = data;
                });
            }
          }
        });
      });
    }
  }