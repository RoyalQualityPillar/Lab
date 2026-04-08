import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CmService {
  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  cmOnCreate(attachments: any, reffereceAttachments: any, body: any) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let file of attachments) {
      formData.append('docFiles', file);
    }
    for (let file of reffereceAttachments) {
      formData.append('referenceAttachments', file);
    }

    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body.ursDTO)], {
      type: 'application/json',
    });
    formData.append('cmDTO', jsonBlob, 'data.json');
    //formData.append('ursDTO', JSON.stringify(body.ursDTO));
    console.log(formData);
     let createUserURL = this.API_URL + 'cm/cm/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
  getCMDocResquestNo(lc0002: any, lc0001: string) {
    const queryParams = `?lc0002=${lc0002}&lc0001=${lc0001}`;
    const reviewURL = this.API_URL + 'cm/cm-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   public cmInput(unitCode: string): Observable<any> {
    return this.http.get(this.API_URL + `cm/cm/input?unitcode=${unitCode}`);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   public productList(uc0001: string): Observable<any> {
    return this.http.get(this.API_URL + `cm/product-list?uc0001=${uc0001}`);
  }
   getDocResquestNo(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'cm/doc-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  getCMAttachResquestNo(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'dms/att-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
  documentList(lc0003: any, lc0002:string) {
    const queryParams = `?lc0003=${lc0003}&lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'cm/document-list' + queryParams;
    return this.http.get(reviewURL);
  }
  attachmentList(lc0003: any, moduleCode: any) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
   getDocumetPreview(PdfType: string, uc0001: any, ff0001: any, ff0002: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${ff0001}&ff0002=${ff0002}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
  
  documentRivision(data: any) {
    const reviewURL = this.API_URL + 'cm/document-revision';
    return this.http.post(reviewURL, data);
  }
   getObsolated(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/lc-obsoleted';
    return this.http.post(nextStageURL, requestBody);
  }
   
  getDocumet(PdfType: string, uc0001: any, lcrqNumber: any, lcnum: any) {
    const queryParams = `?PdfType=${PdfType}&uc0001=${uc0001}&ff0001=${lcrqNumber}&ff0002=${lcnum}`;
    const reviewURL = this.API_URL + 'file/pdf-download' + queryParams;
    return this.http.post(reviewURL, '');
  }
   public managerRights(lcnum: string): Observable<any> {
    return this.http.get(this.API_URL + `cm/qa-manager-rights?lcnum=${lcnum}`);
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
   onGetAuditTrailData(
    lcRequestnumber: string,
    lcnum: string,
    templateName: string,
    stage: any,
    userid: string,
    moduleCode: string
  ) {
    const queryParams = `?lcRequestnumber=${lcRequestnumber}&lcnum=${lcnum}&templateName=${templateName}&stage=${stage}&userid=${userid}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'cm/audit-trail/get-all' + queryParams;
    return this.http.post(reviewURL, '');
  }
}
