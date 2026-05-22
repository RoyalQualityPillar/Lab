import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LimsCmService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getInputValue() {
    let inputFieldValueURL = this.API_URL + 'lims-cm/input';
    return this.http.get(inputFieldValueURL);
  }
}
