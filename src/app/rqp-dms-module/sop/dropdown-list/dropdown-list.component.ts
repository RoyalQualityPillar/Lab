import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-dropdown-list',
  standalone: false,
  templateUrl: './dropdown-list.component.html',
  styleUrl: './dropdown-list.component.scss'
})
export class DropdownListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  selection = new SelectionModel<any>(true, []);
  public tableData: any;
  public displayColumns: string[] = ['action', 'department','lcrole', 'userid', 'stage'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DropdownListComponent>
  ) {}
  ngOnInit(): void {
    this.tableData = new MatTableDataSource(this.data.data);
  }

  ngAfterViewInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const nomRows = this.tableData.data.length;
    return numSelected === nomRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.data.forEach((row) => this.selection.select(row));
  }

  onSelectedRow() {
    if (this.selection.selected.length < 1) {
      this.dialog.open(MessageDialogComponent, {
        width: '400px',
        data: {
          message: 'Please select any row',
          heading: 'Error Information',
        },
      });
      return;
    } else {
      this.dialogRef.close({ data: this.selection.selected });
    }
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.tableData.filter = filterValue;
  }
}

