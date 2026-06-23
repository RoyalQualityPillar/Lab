import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import moment from 'moment';
import { NotificationService } from 'src/app/common/notification.service';
import { apiEndPoints } from 'src/app/service/api-service/api-endpoints.constant';
import { ApiService } from 'src/app/service/api-service/api.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface PreventiveMaintananceScheduleRequest {
  fromDate: string;
  toDate: string;
  scheduletype: string;
}

export interface ScheduleMonths {
  [month: string]: string;
}

export interface PreventiveMaintananceScheduleRecord {
  equipmentId: string;
  schedule: ScheduleMonths;
}
@Component({
  selector: 'app-preventive-maintanance-schedule-master',
  standalone: false,
  templateUrl: './preventive-maintanance-schedule-master.component.html',
  styleUrl: './preventive-maintanance-schedule-master.component.scss'
})
export class PreventiveMaintananceScheduleMasterComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchForm: FormGroup;
  isLoading = false;
  hasSearched = false;
  tableData = new MatTableDataSource<PreventiveMaintananceScheduleRecord>([]);
  dateRangeError = '';

  readonly scheduleTypeOptions = [
    { value: 'M', label: 'Month' },
    { value: 'Y', label: 'Year' },
  ];

  private readonly MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  scheduleColumnKeys: string[] = [];
  scheduleColumnHeaders: { [key: string]: string } = {};
  displayedColumns: string[] = ['srNo', 'equipmentId'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      scheduleType: ['', Validators.required],
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.dateRangeError = '';
    });
  }

  onSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const validationError = this.validateDateRange();
    if (validationError) {
      this.dateRangeError = validationError;
      return;
    }

    this.dateRangeError = '';
    this.fetchScheduleData();
  }

  private validateDateRange(): string | null {
    const fromMoment = moment(this.searchForm.get('fromDate')!.value);
    const toMoment = moment(this.searchForm.get('toDate')!.value);
    const scheduleType: string = this.searchForm.get('scheduleType')!.value;

    if (!fromMoment.isValid() || !toMoment.isValid()) {
      return null;
    }

    if (fromMoment.isAfter(toMoment)) {
      return 'From Date cannot be greater than To Date.';
    }

    if (scheduleType === 'M') {
      const maxTo = fromMoment.clone().add(1, 'month');
      if (toMoment.isAfter(maxTo, 'day')) {
        return 'For Schedule Type "Month", the date range must not exceed one month.';
      }
    }

    if (scheduleType === 'Y') {
      const maxTo = fromMoment.clone().add(1, 'year');
      if (toMoment.isAfter(maxTo, 'day')) {
        return 'For Schedule Type "Year", the date range must not exceed one year.';
      }
    }

    return null;
  }

  private fetchScheduleData(): void {
    const params: PreventiveMaintananceScheduleRequest = {
      fromDate: moment(this.searchForm.get('fromDate')!.value).format('YYYY-MM-DD'),
      toDate: moment(this.searchForm.get('toDate')!.value).format('YYYY-MM-DD'),
      scheduletype: this.searchForm.get('scheduleType')!.value,
    };

    this.isLoading = true;
    this.hasSearched = true;
    this.tableData.data = [];

    this.apiService
      .sendRequest(apiEndPoints.pmmEquipmentScheduleList, 'GET', params, null)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response?.errorInfo) {
            this.notificationService.showError(response.errorInfo.message);
            this.tableData.data = [];
          } else {
            const data: PreventiveMaintananceScheduleRecord[] = Array.isArray(response?.data)
              ? response.data
              : [];
            this.buildColumns(data, params.scheduletype);
            this.tableData.data = data;
          }
        },
        error: () => {
          this.isLoading = false;
          this.notificationService.showError(
            'Failed to fetch schedule data. Please try again.'
          );
          this.tableData.data = [];
        },
      });
  }

  private buildColumns(data: PreventiveMaintananceScheduleRecord[], scheduleType: string): void {
    if (!data || data.length === 0) {
      this.scheduleColumnKeys = [];
      this.scheduleColumnHeaders = {};
      this.displayedColumns = ['srNo', 'equipmentId'];
      return;
    }
    const keys = Object.keys(data[0].schedule).sort((a, b) => +a - +b);
    this.scheduleColumnKeys = keys;
    this.scheduleColumnHeaders = {};
    keys.forEach(k => {
      if (scheduleType === 'Y') {
        this.scheduleColumnHeaders[k] = this.MONTH_NAMES[+k - 1] ?? k;
      } else {
        this.scheduleColumnHeaders[k] = k;
      }
    });
    this.displayedColumns = ['srNo', 'equipmentId', ...keys];
  }

  onReset(): void {
    this.searchForm.reset({ fromDate: null, toDate: null, scheduleType: '' });
    this.searchForm.markAsUntouched();
    this.searchForm.markAsPristine();
    this.tableData.data = [];
    this.scheduleColumnKeys = [];
    this.scheduleColumnHeaders = {};
    this.displayedColumns = ['srNo', 'equipmentId'];
    this.hasSearched = false;
    this.dateRangeError = '';
  }

  onBack(): void {
    this.router.navigate(['./rqplabui/lims/ims-master-data-home-page']);
  }
}
