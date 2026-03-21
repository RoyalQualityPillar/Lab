import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';

//mport { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private API_URL = environment.apiBaseURL;
  public selectedDepartmentcode:any;
  //private API_URL='http://103.10.234.106:8081/';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getDropDownList() {
    let token = this.cookieService.get('token');
    let listURL =
      this.API_URL +
      `admin/userprofile/input?unitCode=${this.cookieService.get('buCode')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(listURL, httpOptions);
  }
  onGetDropDownList() {
    let token = this.cookieService.get('token');
    let listURL =
      this.API_URL +
      `clv/input?unitCode=${this.cookieService.get('buCode')}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.get(listURL, httpOptions);
  }
  saveUserData(body: any) {
    console.log(body);
    body.dob = moment(body.dob, 'DD-MM-YYYY').format('DD-MM-YYYY');
    body.joinedDate = moment(body.joinedDate, 'DD-MM-YYYY').format(
      'DD-MM-YYYY'
    );
    body.effectiveDate = moment(body.effectiveDate, 'DD-MM-YYYY').format(
      'DD-MM-YYYY'
    );
    console.log(body);
    let token = this.cookieService.get('token');
    let createUserURL = this.API_URL + 'admin/userprofile/save-update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(createUserURL, body, httpOptions);
  }
  getActiveUserList(size: any, pageIndex: any) {
    const queryParams = `?pageIndex=${pageIndex}&size=${size}&unitCode=${this.cookieService.get(
      'buCode'
    )}`;
    let token = this.cookieService.get('token');
    let fetchProfileListURLActive =
      this.API_URL + 'admin/userprofile/get-max-all' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchProfileListURLActive, '', httpOptions);
  }

  getUserProfileList(size: any, pageIndex: any, selectedTab: any) {
    const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll =
      this.API_URL + 'admin/userprofile/get-all' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchProfileListUrlAll, '', httpOptions);
  }

  getUserProfileFilterData(body) {
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll = this.API_URL + 'admin/userprofile/serach';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchProfileListUrlAll, body, httpOptions);
  }
  onAuditTrail(employeeId: any) {
    const queryParams = `?employeeId=${employeeId}`;
    let token = this.cookieService.get('token');
    let fetchAuditTrailUrlAll =
      this.API_URL + 'admin/userprofile/get-by-code' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchAuditTrailUrlAll, '', httpOptions);
  }
  onActiveAuditTrail(employeeId: any) {
    const queryParams = `?employeeId=${employeeId}`;
    let token = this.cookieService.get('token');
    let fetchAuditTrailUrlAll =
      this.API_URL + 'admin/userprofile/get-max-by-code' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchAuditTrailUrlAll, '', httpOptions);
  }
  createAllLifeCycle(body: any) {
    console.log(body);
    let token = this.cookieService.get('token');

    let createLifeCycleUrlAll = this.API_URL + 'admin/lifecycle/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(createLifeCycleUrlAll, body, httpOptions);
  }

  // LIFE CYCLE
  getAllLifeCycleList(size: any, pageIndex: any) {
    const queryParams = `?pageIndex=${pageIndex}&size=${size}`;
    let token = this.cookieService.get('token');
    let fetchAllLifeCycleListUrlAll =
      this.API_URL + 'admin/lifecycle/get-all' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchAllLifeCycleListUrlAll, '', httpOptions);
  }
  getActiveLifeCycleList(size: any, pageIndex: any, unitCode: any) {
    const queryParams = `?pageIndex=${pageIndex}&size=${size}&unitCode=${unitCode}`;
    let token = this.cookieService.get('token');
    let fetchAllLifeCycleListUrlAll =
      this.API_URL + 'admin/lifecycle/get-max-all' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchAllLifeCycleListUrlAll, '', httpOptions);
  }
  getFilterDataForAllLifeCycle(body: any) {
    let token = this.cookieService.get('token');
    let fetchProfileListUrlAll = this.API_URL + 'admin/lifecycle/search';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchProfileListUrlAll, body, httpOptions);
  }
  getByLCNoList(lcNo: any) {
    const queryParams = `?lcnum=${lcNo}`;
    let token = this.cookieService.get('token');
    let fetchLcNumUrl =
      this.API_URL + 'admin/lifecycle/userlc/get-by-lcnum' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchLcNumUrl, '', httpOptions);
  }
  getUpdateFormData(lcNo: any, stage: any) {
    const queryParams = `?lcnum=${lcNo}&stage=${stage}`;
    let token = this.cookieService.get('token');
    let fetchLcNumUrl =
      this.API_URL + 'admin/lifecycle/userlc/get-by-lcnum-stage' + queryParams;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(fetchLcNumUrl, '', httpOptions);
  }
  getUpdate(body: any) {
    let token = this.cookieService.get('token');
    let updateUrl = this.API_URL + 'admin/lifecycle/userlc/update-lc-previlege';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(updateUrl, body, httpOptions);
  }

  public adminModuleInput( unitcode:string, ff0004: string): Observable<any> {
    return this.http.get(
      this.API_URL +
        `admin/module-input?unitcode=${this.cookieService.get(
          'buCode'
        )}&ff0004=${ff0004}`
    );
  }
  
  public lcInput( module :string): Observable<any> {
    return this.http.get(
      this.API_URL +
        `gm/lc-input?unitCode=${this.cookieService.get(
          'buCode'
        )}&module=${module}`
    );
  }

  public update(lcNum: string): Observable<any> {
    return this.http.post(this.API_URL + `gm/lc-inactive?lcnum=${lcNum}`, '');
  }

  public adminList(unitcode: string): Observable<any> {
    return this.http.get(
      this.API_URL + `admin/module-input?unitcode=${unitcode}&ff0004=DMS`
    );
  }
}
