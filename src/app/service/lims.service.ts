import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LimsService {

  private API_URL = environment.apiBaseURL;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
   onISMSaveUpdate(
    actionAttachments: any[],
    referenceAttachments: any[],
    riskAttachments: any[],
    body: any
  ) {
    console.log(actionAttachments);
    console.log(referenceAttachments);
    console.log(riskAttachments);
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    // for (let file of attachments) {
    //   formData.append('docFiles', file);
    // }
    // Append files in referenceAttachments
    for (let files of referenceAttachments) {
      formData.append('ccAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
    }
    for (let files of riskAttachments) {
      formData.append('riskAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
    }
    // Append files in attachments

    for (let files of actionAttachments) {
      for (let file of files) {
        formData.append('actionAttachments', file); // Adjust 'docFiles' as per your API's expected key
      }
    }

    // for (let files of actionAttachments) {
    //   if (files && files.length > 0) {
    //     for (let file of files) {
    //       if (file) {
    //         formData.append('actionAttachments', file); // Adjust 'actionAttachments' as per your API's expected key
    //       } else {
    //         // Append an empty Blob if file is undefined
    //         formData.append('actionAttachments', new Blob());
    //       }
    //     }
    //   } else {
    //     // Append an empty Blob if no files are present in the array
    //     formData.append('actionAttachments', new Blob());
    //   }
    // }

    // Append JSON data as a blob
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

   onLoadInputNewAPI(unitCode, module, mainModule) {
    const queryParams = `?unitCode=${unitCode}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
   getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }

}
