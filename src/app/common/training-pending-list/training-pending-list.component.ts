import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageDialogComponent } from 'src/app/common/message-dialog/message-dialog.component';

@Component({
    selector: 'app-training-pending-list',
    templateUrl: './training-pending-list.component.html',
    styleUrls: ['./training-pending-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TrainingPendingListComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @Input() public groupList = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  displayColumns: string[] = ['action', 'uc0001', 'ff0001'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TrainingPendingListComponent>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['groupList'] && this.groupList) {
      this.groupList = changes?.['groupList'].currentValue;
      this.groupList.paginator = this.paginator;
      this.groupList.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.groupList.paginator = this.paginator;
    this.groupList.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const nomRows = this.groupList.data.length;
    return numSelected === nomRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
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
    this.groupList.filter = filterValue;
  }
}
