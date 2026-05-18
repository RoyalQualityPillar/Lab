import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddNewRecordService {

 private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

public bmrInput(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `bmr/bmr/input?unitcode=${unitCode}`);
  }
  public pmBmrUpdate(body: any): Observable<any> {
    return this.http.post(this.API_URL + `dms/pm-bmrUpdate`, body);
  }
}
