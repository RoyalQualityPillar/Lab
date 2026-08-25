import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpmService {
private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getAllInstrmentsList(unitcode: string): Observable<any> {
    return this.http.get(this.API_URL + `lbms/all-instrments-list?unitcode=${unitcode} `);
  }
}