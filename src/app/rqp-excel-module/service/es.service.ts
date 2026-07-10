import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EsService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient) {}

  public saveUpdate(list: any): Observable<any> {
    return this.http.post(this.API_URL + 'xl/xl_sda/save-update', list);
  }

  public xlAsi(list: any): Observable<any> {
    return this.http.post(this.API_URL + 'xl2/xl-as1', list);
  }

  public moduleReq(lc0002: string, lc0001: string): Observable<any> {
    return this.http.get(
      this.API_URL +
        `xl2/ES-module-request-no?lc0002=${lc0002}&lc0001=${lc0001}`
    );
  }
}
