import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StdService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

   public getWSPackList(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `limsws/ws-pack-list?unitCode=${unitCode} `);
  }
   public saveWSConsumptionList(ff0001: string, grams:any, arNo:any) {
    const queryParams = `?ff0001=${ff0001}&grams=${grams}&arNo=${arNo}`;
    const samplingURL = this.API_URL + 'limsws/ws-consumption-save' + queryParams;
    return this.http.post(samplingURL, '');
  }
}
