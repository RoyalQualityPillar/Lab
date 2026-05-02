import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpmService {

  private API_URL = environment.apiBaseURL;
constructor(private http: HttpClient, private cookieService: CookieService) { }
   
public bmrInput(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `bmr/bmr/input?unitcode=${unitCode}`);
  }
 getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
  getDropDownList(unitcode:any) {
    let queryParams = `?unitCode=${unitcode}`;
    const ALLSALEPRODUCTURL = this.API_URL + 'pmm/input' + queryParams;
    return this.http.get(ALLSALEPRODUCTURL);
  }
   public productList(uc0001: string): Observable<any> {
    return this.http.get(this.API_URL + `dms/product-list?uc0001=${uc0001}`);
  }
}
