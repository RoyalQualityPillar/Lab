import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GtpService {
private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient) {}
  
  public getInput(unitCode: string) {
    const inputUrl = this.API_URL + `lmsm/input?unitCode=${unitCode}`;
    return this.http.get(inputUrl);
  }
}
