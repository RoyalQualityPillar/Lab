import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PcmServiceService {

 private API_URL = environment.apiBaseURL;
          constructor(private http: HttpClient, private cookieService: CookieService) {}
        
          onCreate(body: any) {
            console.log(body);
            let token = this.cookieService.get('token');
            let createUserURL = this.API_URL + 'at/samplerun-master/save-update';
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
        this.API_URL + 'at/samplerun-master/get-by-code-all' + queryParams;
  
      return this.http.get(fetchAllBusinessUnitInfoApiUrl);
    }
     getDropDownList(unitCode: any) {
      let queryParams = `?unitCode=${unitCode}`;
      let fetchAllBusinessUnitInfoApiUrl = this.API_URL + 'sd/input' + queryParams;
  
      return this.http.get(fetchAllBusinessUnitInfoApiUrl);
    }
         generateReport(
                  uc0001: any,
                  templateName: string,
                  moduleCode: string
                ): Observable<any> {
                  return this.http.post(
                    this.API_URL +
                      `pmm/vendor-master-report?templateName=${templateName}&uc0001=${uc0001}&moduleCode=${moduleCode}`,
                    ''
                  );
                
                  }
        }
