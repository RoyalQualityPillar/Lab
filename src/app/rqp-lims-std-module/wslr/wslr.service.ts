import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WslrService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
   getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }

  onSaveWSLR(body: any){
    const wslrURL = this.API_URL + 'limsws/wslr-save-update';
    return this.http.post(wslrURL, body);
  }

  getResquestNoIDForIWSLR(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'limsws/wslr-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getWslcrRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsws/WslcrRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getWslcurRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsws/WslcurRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getWslprRecordList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsws/WslprRecord-list' + queryParams;
    return this.http.get(reviewURL);
  }
  onGetCommentsData(
    lcRequestnumber: string,
    lcnum: string,
    templateName: string,
    stage: any,
    userid: string,
    moduleCode: string
  ) {
    const queryParams = `?lcRequestnumber=${lcRequestnumber}&lcnum=${lcnum}&templateName=${templateName}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gmapr/gmap-comment/get-all' + queryParams;
    return this.http.post(reviewURL, '');
  }
}

