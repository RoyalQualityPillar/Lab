import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CciMasterService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

    generateReport(
          uc0001: any,
          templateName: string,
          moduleCode: string
        ): Observable<any> {
          return this.http.post(
            this.API_URL +
              `limscm/cci-master-report?uc0001=${uc0001}&templateName=${templateName}&moduleCode=${moduleCode}`,
            ''
          );
        
          }
}
