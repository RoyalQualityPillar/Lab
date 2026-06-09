import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LimsService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  onLoadInputNewAPI(unitCode, module, mainModule) {
    const queryParams = `?unitCode=${unitCode}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   onIPMSaveUpdate(
    actionAttachments: any[],
    referenceAttachments: any[],
    body: any
  ) {
    console.log(actionAttachments);
    console.log(referenceAttachments);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    // for (let file of attachments) {
    //   formData.append('docFiles', file);
    // }
    // Append files in referenceAttachments
    for (let files of referenceAttachments) {
      formData.append('ccAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
    }
    // Append files in attachments

    for (let files of actionAttachments) {
      for (let file of files) {
        formData.append('actionAttachments', file); // Adjust 'docFiles' as per your API's expected key
      }
    }
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('ipmDTO', jsonBlob, 'data.json');

    console.log(formData); // Check the FormData structure in the browser's console

    let createUserURL = this.API_URL + 'limsm-im/ipm-save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
  public getInput(unitCode: string) {
    const inputUrl = this.API_URL + `lmsm/input?unitCode=${unitCode}`;
    return this.http.get(inputUrl);
  }
   public adminModuleInput(ff0004: string): Observable<any> {
    return this.http.get(
      this.API_URL +
        `admin/module-input?ff0002=${this.cookieService.get(
          'buCode'
        )}&ff0004=${ff0004}`
    );
  }
   public trainingPending(ff0004: string, ff0002: string): Observable<any> {
    return this.http.get(
      `${this.API_URL}gtp/Training-Pending?ff0004=${ff0004}&ff0002=${ff0002}&ff0011=0`
    );
  }
   onCommentsData(ff0001: any, lcnum: any, ff0005: number) {
    const queryParams = `?FF0001=${ff0001}&FF0002=${lcnum}&FF0005=${ff0005}`;
    const reviewURL =
      this.API_URL + 'gm/gmap-record/review-comments' + queryParams;
    return this.http.get(reviewURL);
  }
  getEventClassification(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'qms/review-nci-ec' + queryParams;
    return this.http.get(reviewURL);
  }
  getCCLineItemHeader(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'cc/review-cc-cl' + queryParams;
    return this.http.get(reviewURL);
  }
   getCCIssueDetails(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'cc/review-cc-cd' + queryParams;
    return this.http.get(reviewURL);
  }
  getResquestNoIDForURS(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'nci/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getResquestNoIDForQMS(lc0004: any) {
    const queryParams = `?lc0004=${lc0004}`;
    const reviewURL =
      this.API_URL + 'qms/qms/action-module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getResquestNoIDForCC(lc0002: any) {
    const queryParams = `?lc0002=${lc0002}`;
    const reviewURL = this.API_URL + 'cc/module-request-no' + queryParams;
    return this.http.get(reviewURL);
  }
   getEventActionItem(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'qms/review-nci-ai' + queryParams;
    return this.http.get(reviewURL);
  }
  documentList(lc0003: any, moduleCode: string) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
  onISMSaveUpdate(
    actionAttachments: any[],
    referenceAttachments: any[],
    body: any
  ) {
    console.log(actionAttachments);
    console.log(referenceAttachments);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    // for (let file of attachments) {
    //   formData.append('docFiles', file);
    // }
    // Append files in referenceAttachments
    for (let files of referenceAttachments) {
      formData.append('ccAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
    }
    // Append files in attachments

    for (let files of actionAttachments) {
      for (let file of files) {
        formData.append('actionAttachments', file); // Adjust 'docFiles' as per your API's expected key
      }
    }
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('ccDTO', jsonBlob, 'data.json');

    console.log(formData); // Check the FormData structure in the browser's console

    let createUserURL = this.API_URL + 'limsm-im/ism-save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }


  
}
