import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    onSPMSaveUpdate(
    spAttachments: any[],
    body: any
  ) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();
    
     for (let file of spAttachments) {
      formData.append('spAttachments', file);
    }
    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('spdto', jsonBlob, 'data.json');

    let createUserURL = this.API_URL + 'limsm/specification-request';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
   getResquestNoIDForSPM(lc0002: any, lc0001:any) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'limsm/specification-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getSPMAttachments(lc0003:string, moduleCode:string){
 const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
  onDownloadDocumet( uc0001: any) {
    const queryParams = `?uc0001=${uc0001}`;
    const reviewURL = this.API_URL + 'file/att-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
    getSPMDescriptionList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm/spcDescription-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getSPMTestList(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'limsm/spcTest-list' + queryParams;
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
   onCommentsData(ff0001: any, lcnum: any, ff0005: number) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
}
