import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrevntMainScheService {

  private API_URL = environment.apiBaseURL;
   constructor(private http: HttpClient, private cookieService: CookieService) { }
 
   onCreate(body: any) {
     console.log(body);
     let token = this.cookieService.get('token');
     let createUserURL = this.API_URL + 'limsm-im/pmm-cls-master/save-update';
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + token,
       }),
     };
     return this.http.post(createUserURL, body, httpOptions);
   }
   onAllRoleAuditTrail(uc0001: any) {
     let queryParams = `?UC0001=${uc0001}`;
     let fetchAllBusinessUnitInfoApiUrl =
       this.API_URL + 'limsm-im/pmm-cls-master/get-by-code-all' + queryParams;
 
     return this.http.get(fetchAllBusinessUnitInfoApiUrl);
   }
 
   public onManualSchedulTrail(uc0001: any): Observable<any> {
     return this.http.post(this.API_URL + `limsm-im/manual-schedule?uc0001=${uc0001}`, '');
   }
   getDropDownDeptList(unitCode: any) {
     let queryParams = `?unitCode=${unitCode}`;
     const ALLSALEPRODUCTURL = this.API_URL + 'limsm-im/input' + queryParams;
     return this.http.get(ALLSALEPRODUCTURL);
   }
 }
 
 
 
 
 
 
