import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsLotPuritiesRecordService {

  private API_URL = environment.apiBaseURL;
 constructor(private http: HttpClient, private cookieService: CookieService) {}

  onCreate(body: any) {
    let token = this.cookieService.get('token');
    let createUserURL = this.API_URL + 'limsws/wslpr-record/save-update';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http.post(createUserURL, body, httpOptions);
  }
  
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
    onAllRoleAuditTrail(uc0001: any) {
    let queryParams = `?UC0001=${uc0001}`;
    const ALLSALEPRODUCTURL =
      this.API_URL + 'limsws/wslpr-record/get-by-code-all' + queryParams;
    return this.http.get(ALLSALEPRODUCTURL);
  }
    generateReport(
      uc0001: any,
      templateName: string,
      moduleCode: string
    ): Observable<any> {
      return this.http.post(
        this.API_URL +
          `limsws/wslpr-record-report?templateName=${templateName}&uc0001=${uc0001}&moduleCode=${moduleCode}`,
        ''
      );
    }
}

