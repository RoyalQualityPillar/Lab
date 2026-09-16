import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColumnMasterService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

bmrInput(unitCode: any) {
   let queryParams = `?unitCode=${unitCode}`;
    const ALLSALEPRODUCTURL = this.API_URL + 'limscm/cm-input' + queryParams;
    return this.http.get(ALLSALEPRODUCTURL);
  }
  generateReport(
            uc0001: any,
            templateName: string,
            moduleCode: string
          ): Observable<any> {
            return this.http.post(
              this.API_URL +
                `limscm/cm-master-report?uc0001=${uc0001}&templateName=${templateName}&moduleCode=${moduleCode}`,
              ''
            );
          
            }
}
 