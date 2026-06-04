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

   onLoadInputNewAPI(businessunit, module, mainModule) {
    const queryParams = `?businessunit=${businessunit}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
  getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
   onCCSaveUpdate(
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

    let createUserURL = this.API_URL + 'cc/save-update';

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
}
