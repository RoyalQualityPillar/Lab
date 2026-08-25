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
  
   
   onLoadInputNewAPI(unitCode, module, mainModule) {
    const queryParams = `?unitCode=${unitCode}&module=${module}&mainModule=${mainModule}`;
    let URL = this.API_URL + 'qms/input' + queryParams;
    return this.http.get(URL);
  }
   getNextStageList(requestBody: any) {
    const nextStageURL = this.API_URL + 'gm/input/get-np-stages';
    return this.http.post(nextStageURL, requestBody);
  }
  getEventClassification(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'qms/review-nci-ec' + queryParams;
    return this.http.get(reviewURL);
  }
   getEventActionItem(lc0003: any) {
    const queryParams = `?lc0003=${lc0003}`;
    const reviewURL = this.API_URL + 'qms/review-nci-ai' + queryParams;
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
   documentList(lc0003: any, moduleCode: string) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
    getQmsAttachmentList(lc0003: any, moduleCode: string) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/qms-attachment-list' + queryParams;
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
  onSaveUpdate(
    actionAttachments: any[],
    referenceAttachments: any[],
    body: any
  ) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    // for (let file of attachments) {
    //   formData.append('docFiles', file);
    // }
    // Append files in referenceAttachments
    for (let files of referenceAttachments) {
      formData.append('nciAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
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
    formData.append('nciDTO', jsonBlob, 'data.json');


    let createUserURL = this.API_URL + 'nci/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }
   getRiskAttachmentList(lc0003: any, moduleCode: string) {
    const queryParams = `?lc0003=${lc0003}&moduleCode=${moduleCode}`;
    const reviewURL = this.API_URL + 'gm/risk-attachment-list' + queryParams;
    return this.http.get(reviewURL);
  }
   downloadCCAttachedreport(
    lcnum: string,
    templateName: string,
    moduleCode: string,
    lcrnumber: string
  ) {
    return this.http.post(
      this.API_URL +
      `ccr/cc-all-attched-report/get-all?lcnum=${lcnum}&templateName=${templateName}&moduleCode=${moduleCode}&lcrnumber=${lcrnumber}`,
      ''
    );
  }
  downloadCCreport(
    lcnum: string,
    templateName: string,
    ccno: string,
    moduleCode: string,
    lcrnumber: string
  ) {
    return this.http.post(
      this.API_URL +
      `ccr/cc-report/get-all?lcnum=${lcnum}&templateName=${templateName}&ccno=${ccno}&moduleCode=${moduleCode}&lcrnumber=${lcrnumber}`,
      ''
    );
  }
  onNCIASaveUpdate(
    actionAttachments: any[],
    referenceAttachments: any[],
    body: any
  ) {
    let token = this.cookieService.get('token');
    let formData: FormData = new FormData();

    for (let files of referenceAttachments) {
      formData.append('nciAttachments', files); // Adjust 'referenceAttachments' as per your API's expected key
    }
    // Append files in attachments

    for (let files of actionAttachments) {
      for (let file of files) {
        formData.append('actionAttachments', file); // Adjust 'docFiles' as per your API's expected key
      }
    }
    // Append JSON data as a blob
    const jsonBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('cActionDTO', jsonBlob, 'data.json');

    let createUserURL = this.API_URL + 'action/save-update';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.post(createUserURL, formData, httpOptions);
  }

}